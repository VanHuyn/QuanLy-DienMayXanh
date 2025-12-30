import { useMemo, useState } from "react";
import { useInventory } from "../../context/InventoryContext";
import useAuth from "../../hooks/useAuth";
import StaffProductCard from "../../components/staff/StaffProductCard";
import SellProductModal from "../../components/staff/SellProductModal";

export default function SalesStaffProducts() {
  const { inventories, loading } = useInventory();
  const { user } = useAuth(); // nhân viên đang login
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Lấy chi nhánh của nhân viên
  const branchId = user?.ChiNhanh?.Id;

  // Lọc sản phẩm của chi nhánh đang làm
  const branchInventories = useMemo(() => {
    if (!branchId) return [];
    return inventories.filter(
      (i) =>
        i.KhoChiNhanh?.ChiNhanhId === branchId &&
        Number(i.SoLuong) > 0 &&
        i.BienThe?.SanPham?.TrangThai === "DangBan"
    );
  }, [inventories, branchId]);

  const handleSellClick = (product) => {
    setSelectedProduct(product); // mở modal bán hàng
  };

  const handleCloseModal = () => setSelectedProduct(null);

  return (
    <main className="relative p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">
        Sản phẩm chi nhánh: {user?.ChiNhanh?.Ten || "Không xác định"}
      </h1>

      {loading && <p className="text-gray-600">Đang tải sản phẩm...</p>}

      {!loading && branchInventories.length === 0 && (
        <p className="text-gray-600">Hiện chưa có sản phẩm</p>
      )}

      <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
        {branchInventories.map((item) => {
          const sp = item?.BienThe?.SanPham;
          return (
            <StaffProductCard
              key={item.Id}
              product={{ ...sp, SoLuong: item.SoLuong }} // đính kèm tồn kho chi nhánh
              onSell={handleSellClick}
            />
          );
        })}
      </div>

      {/* Modal bán hàng */}
      {selectedProduct && (
        <SellProductModal
          product={selectedProduct}
          onClose={handleCloseModal}
          branchId={branchId}
        />
      )}
    </main>
  );
}
