import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FiTrash2, FiPlus, FiMinus } from "react-icons/fi";

const testCart = [
  {
    id: 1,
    name: "Máy lọc nước Kangaroo KG10A3 - 10 Lít",
    price: 4500000,
    image: "https://cdnv2.tgdd.vn/mwg-static/product/76/281176/may-loc-nuoc-kangaroo-kg10a3-600x600.jpg",
    qty: 1,
    discount: 10,
  },
  {
    id: 2,
    name: "Máy lọc không khí Sharp FP-J40E-W",
    price: 3500000,
    image: "https://cdn.tgdd.vn/Products/Images/2853/259769/sharp-fp-j40e-w-600x600.jpg",
    qty: 2,
    discount: 0,
  },
];

export default function CartPage() {
  const [cart, setCart] = useState(testCart);

  const updateQty = (id, delta) => {
    setCart(prev =>
      prev.map(item =>
        item.id === id ? { ...item, qty: Math.max(item.qty + delta, 1) } : item
      )
    );
  };

  const removeItem = id => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold mb-8 text-gray-900">Giỏ hàng</h1>

      {cart.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-gray-500 text-lg mb-6">Chưa có sản phẩm nào trong giỏ hàng.</p>
          <Link
            to="/"
            className="px-6 py-3 bg-linear-to-r from-indigo-500 to-blue-500 text-white rounded-xl shadow-lg hover:from-indigo-600 hover:to-blue-600 transition"
          >
            Quay lại mua sắm
          </Link>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1 flex flex-col gap-4">
            {cart.map(item => (
              <div
                key={item.id}
                className="flex flex-col sm:flex-row items-center bg-white rounded-3xl shadow-md p-4 gap-4 hover:shadow-xl transition"
              >
                <div className="relative w-32 h-32 shrink-0">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-contain rounded-2xl"
                  />
                  {item.discount > 0 && (
                    <span className="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold px-2 py-0.5 rounded-lg shadow">
                      -{item.discount}%
                    </span>
                  )}
                </div>
                <div className="flex-1 flex flex-col justify-between h-full">
                  <p className="font-semibold text-gray-900 text-lg">{item.name}</p>
                  <p className="text-red-600 font-bold text-xl mt-1">{item.price.toLocaleString()}₫</p>
                  <div className="flex items-center gap-3 mt-4">
                    <button
                      onClick={() => updateQty(item.id, -1)}
                      className="flex items-center justify-center w-10 h-10 border rounded-lg hover:bg-gray-100 transition"
                    >
                      <FiMinus />
                    </button>
                    <input
                      type="text"
                      value={item.qty}
                      readOnly
                      className="w-12 text-center border rounded-lg py-2 text-gray-800 font-semibold"
                    />
                    <button
                      onClick={() => updateQty(item.id, 1)}
                      className="flex items-center justify-center w-10 h-10 border rounded-lg hover:bg-gray-100 transition"
                    >
                      <FiPlus />
                    </button>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="ml-4 text-white bg-red-500 hover:bg-red-600 p-2 rounded-lg shadow transition"
                    >
                      <FiTrash2 size={20} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="w-full lg:w-96 bg-white rounded-3xl shadow-md p-6 flex flex-col gap-6 sticky top-6">
            <h2 className="font-bold text-2xl text-gray-900">Tóm tắt đơn hàng</h2>
            <div className="flex justify-between text-gray-700 text-lg">
              <span>Số lượng sản phẩm:</span>
              <span>{cart.reduce((sum, item) => sum + item.qty, 0)}</span>
            </div>
            <div className="flex justify-between font-bold text-red-600 text-2xl">
              <span>Tổng tiền:</span>
              <span>{totalPrice.toLocaleString()}₫</span>
            </div>
            <button className="w-full px-4 py-3 bg-linear-to-r from-indigo-500 to-blue-500 text-white font-semibold rounded-2xl shadow-lg hover:from-indigo-600 hover:to-blue-600 transition">
              Thanh toán ngay
            </button>
            <p className="text-sm text-gray-500 mt-2">
              Vui lòng kiểm tra giỏ hàng trước khi thanh toán.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
