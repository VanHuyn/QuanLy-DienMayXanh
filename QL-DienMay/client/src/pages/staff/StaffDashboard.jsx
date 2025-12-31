import { useMemo, useState } from "react";
import { useInventory } from "../../context/InventoryContext";
import useAuth from "../../hooks/useAuth";
import StaffProductCard from "../../components/staff/StaffProductCard";
import SellProductModal from "../../components/staff/SellProductModal";
import { useQuay } from "../../context/QuayContext";

export default function SalesStaffProducts() {
  const { inventories, loading } = useInventory();
  const { user } = useAuth();
  const branchId = user?.ChiNhanh?.Id;

  const {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    total,
    sellAtQuay,
    loading: selling,
  } = useQuay();

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [customerEmail, setCustomerEmail] = useState("");
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const branchInventories = useMemo(() => {
    if (!branchId) return [];
    return inventories.filter(
      (i) =>
        i.KhoChiNhanh?.ChiNhanhId === branchId &&
        Number(i.SoLuong) > 0 &&
        i.BienThe?.SanPham?.TrangThai === "DangBan"
    );
  }, [inventories, branchId]);

  const handleAddToCart = (bienThe, soLuong = 1) => {
    const item = {
      bienTheSanPhamId: bienThe.BienTheId,
      Ten: bienThe.Ten,
      GiaKhuyenMai: parseFloat(bienThe.GiaKhuyenMai || bienThe.Gia || 0),
      soLuong,
    };
    addToCart(item);
  };

  const handleRemoveFromCart = (bienTheSanPhamId) =>
    removeFromCart(bienTheSanPhamId);

  const handleOpenConfirm = () => {
    if (!cartItems.length) return alert("Giỏ hàng trống!");
    setShowConfirmModal(true);
  };

  const handleConfirmCheckout = async () => {
    try {
      await sellAtQuay({
        PhuongThucThanhToan: "Cod",
        MoTa: "Bán tại quầy",
        email: customerEmail || null,
      });
      setCustomerEmail("");
      setShowConfirmModal(false);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <main className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">
        Bán hàng chi nhánh: {user?.ChiNhanh?.Ten || "Không xác định"}
      </h1>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Danh sách sản phẩm */}
        <div className="flex-1">
          {loading && <p>Đang tải sản phẩm...</p>}
          {!loading && branchInventories.length === 0 && (
            <p>Hiện chưa có sản phẩm</p>
          )}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-4">
            {branchInventories.map((item) => {
              const sp = item?.BienThe?.SanPham || {};
              const bienThe = item.BienThe || {};
              return (
                <StaffProductCard
                  key={item.Id}
                  product={{ ...sp, SoLuong: item.SoLuong }}
                  onSell={() =>
                    handleAddToCart({
                      Ten: sp.Ten,
                      GiaKhuyenMai: parseFloat(
                        bienThe.GiaKhuyenMai || sp.Gia || 0
                      ),
                      BienTheId: bienThe.Id,
                    })
                  }
                />
              );
            })}
          </div>
        </div>

        {/* Giỏ hàng + thông tin khách */}
        <div className="w-full md:w-96 p-4 border rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-2">Giỏ hàng</h2>
          {cartItems.length === 0 ? (
            <p>Chưa có sản phẩm</p>
          ) : (
            <ul className="space-y-2 max-h-80 overflow-y-auto">
              {cartItems.map((item) => (
                <li
                  key={item.bienTheSanPhamId}
                  className="flex justify-between items-center"
                >
                  <div>
                    <p>{item.Ten}</p>
                    <p className="text-sm text-gray-500">
                      {item.soLuong} x {item.GiaKhuyenMai.toLocaleString()}₫
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      min={1}
                      value={item.soLuong}
                      onChange={(e) =>
                        updateQuantity(
                          item.bienTheSanPhamId,
                          Number(e.target.value)
                        )
                      }
                      className="w-16 border rounded px-1"
                    />
                    <button
                      onClick={() =>
                        handleRemoveFromCart(item.bienTheSanPhamId)
                      }
                      className="text-red-500"
                    >
                      X
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}

          <div className="mt-4">
            <p className="font-semibold">Tổng: {total.toLocaleString()}₫</p>
          </div>

          <div className="mt-4">
            <label className="block mb-1 font-semibold">
              Email khách hàng (nếu có)
            </label>
            <input
              type="email"
              value={customerEmail}
              onChange={(e) => setCustomerEmail(e.target.value)}
              placeholder="nhập email"
              className="w-full border rounded px-2 py-1"
            />
          </div>

          <button
            onClick={handleOpenConfirm}
            disabled={selling}
            className="mt-4 w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 disabled:opacity-50"
          >
            Thanh toán tiền mặt
          </button>
        </div>
      </div>

      {selectedProduct && (
        <SellProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          branchId={branchId}
          onAddToCart={handleAddToCart}
        />
      )}

      {/* Modal xác nhận thanh toán */}
      {/* Modal xác nhận thanh toán đẹp hơn */}
      {showConfirmModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          {/* Overlay */}
          <div
            className="absolute inset-0 bg-black bg-opacity-40 backdrop-blur-sm transition-opacity duration-300"
            onClick={() => setShowConfirmModal(false)}
          ></div>

          {/* Modal */}
          <div className="relative bg-white rounded-2xl shadow-xl p-6 w-80 transform transition-all duration-300 scale-95 animate-fade-in">
            <h2 className="text-2xl font-bold mb-4 text-center">
              Xác nhận thanh toán
            </h2>
            <p className="mb-6 text-center text-gray-700">
              Bạn có chắc muốn thanh toán{" "}
              <span className="font-semibold">{total.toLocaleString()}₫</span>{" "}
              không?
            </p>

            <div className="flex justify-center gap-4">
              <button
                onClick={() => setShowConfirmModal(false)}
                className="px-4 py-2 w-28 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-100 transition"
              >
                Hủy
              </button>
              <button
                onClick={handleConfirmCheckout}
                className="px-4 py-2 w-28 bg-green-500 text-white rounded-xl hover:bg-green-600 transition"
              >
                Xác nhận
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Tailwind animation */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-fade-in {
          animation: fadeIn 0.2s ease-out forwards;
        }
      `}</style>
    </main>
  );
}
