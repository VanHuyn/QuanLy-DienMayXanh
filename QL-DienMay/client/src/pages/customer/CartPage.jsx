import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiTrash2, FiPlus, FiMinus } from "react-icons/fi";
import Meta from "../../components/Meta";
import { useCart } from "../../context/CartContext";

export default function CartPage() {
  const { cart, updateItem, removeItem, clearCart } = useCart();
  const [localCart, setLocalCart] = useState([]);
  useEffect(() => {
    if (cart?.ChiTietGioHangs) setLocalCart(cart.ChiTietGioHangs);
  }, [cart]);

  if (!cart || cart.ChiTietGioHangs.length === 0)
    return (
      <div className="text-center py-20">
        <p className="text-gray-500 text-lg mb-6">
          Chưa có sản phẩm nào trong giỏ hàng.
        </p>
        <Link
          to="/"
          className="px-6 py-3 bg-linear-to-r from-indigo-500 to-blue-500 text-white rounded-xl shadow-lg hover:from-indigo-600 hover:to-blue-600 transition"
        >
          Quay lại mua sắm
        </Link>
      </div>
    );

  const handleQtyChange = async (itemId, delta) => {
    const item = localCart.find((i) => i.Id === itemId);
    if (!item) return;

    const newQty = Math.max(item.SoLuong + delta, 1);

    setLocalCart((prev) =>
      prev.map((i) => (i.Id === itemId ? { ...i, SoLuong: newQty } : i))
    );
    await updateItem(itemId, newQty);
  };

  const handleRemove = async (itemId) => {
    setLocalCart((prev) => prev.filter((i) => i.Id !== itemId));
    await removeItem(itemId);
  };

  const totalPrice = localCart.reduce(
    (sum, item) => sum + Number(item.BienTheSanPham.Gia) * item.SoLuong,
    0
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <Meta title="Giỏ hàng của bạn" description="Xem và quản lý giỏ hàng của bạn" />
      <h1 className="text-3xl font-bold mb-8 text-gray-900">Giỏ hàng</h1>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1 flex flex-col gap-4">
          {localCart.map((item) => {
            const product = item.BienTheSanPham;
            const mainImage =
              product.SanPham.AnhSanPhams[0]?.Url || "/no-image.png";

            return (
              <div
                key={item.Id}
                className="flex flex-col sm:flex-row items-center bg-white rounded-3xl shadow-md p-4 gap-4 hover:shadow-xl transition"
              >
                <div className="relative w-32 h-32 shrink-0">
                  <img
                    src={mainImage}
                    alt={product.Ten}
                    className="w-full h-full object-contain rounded-2xl"
                  />
                </div>
                <div className="flex-1 flex flex-col justify-between h-full">
                  <p className="font-semibold text-gray-900 text-lg">
                    {product.Ten}
                  </p>
                  <p className="text-gray-600 text-sm">
                    {product.SanPham.ThuongHieu} | {product.SanPham.XuatXu}
                  </p>
                  <p className="text-red-600 font-bold text-xl mt-1">
                    {Number(product.Gia).toLocaleString()}₫
                  </p>

                  <div className="flex items-center gap-3 mt-4">
                    <button
                      onClick={() => handleQtyChange(item.Id, -1)}
                      className="flex items-center justify-center w-10 h-10 border rounded-lg hover:bg-gray-100 transition"
                    >
                      <FiMinus />
                    </button>
                    <input
                      type="text"
                      value={item.SoLuong}
                      readOnly
                      className="w-12 text-center border rounded-lg py-2 text-gray-800 font-semibold"
                    />
                    <button
                      onClick={() => handleQtyChange(item.Id, 1)}
                      className="flex items-center justify-center w-10 h-10 border rounded-lg hover:bg-gray-100 transition"
                    >
                      <FiPlus />
                    </button>
                    <button
                      onClick={() => handleRemove(item.Id)}
                      className="ml-4 text-white bg-red-500 hover:bg-red-600 p-2 rounded-lg shadow transition"
                    >
                      <FiTrash2 size={20} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
          <button
            onClick={() => clearCart()}
            className="mt-4 w-fit px-4 py-3 bg-red-500 cursor-pointer text-white font-semibold rounded-2xl shadow-lg hover:bg-red-600 transition"
          >
            Xoá toàn bộ giỏ hàng
          </button>
        </div>

        <div className="w-full lg:w-96 bg-white rounded-3xl shadow-md p-6 flex flex-col gap-6 sticky top-6">
          <h2 className="font-bold text-2xl text-gray-900">Tóm tắt đơn hàng</h2>
          <div className="flex justify-between text-gray-700 text-lg">
            <span>Số lượng sản phẩm:</span>
            <span>
              {localCart.reduce((sum, item) => sum + item.SoLuong, 0)}
            </span>
          </div>
          <div className="flex justify-between font-bold text-red-600 text-2xl">
            <span>Tổng tiền:</span>
            <span>{totalPrice.toLocaleString()}₫</span>
          </div>
          <Link to='/dat-hang' className="text-center w-full cursor-pointer px-4 py-3 bg-linear-to-r from-indigo-500 to-blue-500 text-white font-semibold rounded-2xl shadow-lg hover:from-indigo-600 hover:to-blue-600 transition">
            Thanh toán ngay
          </Link>
          <p className="text-sm text-gray-500 mt-2">
            Vui lòng kiểm tra giỏ hàng trước khi thanh toán.
          </p>
        </div>
      </div>
    </div>
  );
}
