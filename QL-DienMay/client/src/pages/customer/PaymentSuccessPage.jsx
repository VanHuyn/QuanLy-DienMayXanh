import React from "react";
import { CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { useEffect } from "react";

export default function PaymentSuccessPage() {
  const { clearCart } = useCart();

  useEffect(() => {
    clearCart();
  }, []);
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white max-w-md w-full rounded-2xl shadow-lg p-8 text-center">
        {/* Icon */}
        <div className="flex justify-center mb-4">
          <CheckCircle className="w-20 h-20 text-green-500" />
        </div>

        {/* Title */}
        <h1 className="text-2xl font-semibold text-gray-800 mb-2">
          Thanh toán thành công 🎉
        </h1>

        {/* Description */}
        <p className="text-gray-600 mb-6">
          Cảm ơn bạn đã mua hàng. Đơn hàng của bạn đã được thanh toán thành công
          và đang được xử lý.
        </p>

        {/* Actions */}
        <div className="flex flex-col gap-3">
          <Link
            to="/"
            className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg font-medium transition"
          >
            Về trang chủ
          </Link>

          <Link
            to="/don-hang"
            className="w-full border border-gray-300 hover:bg-gray-100 text-gray-700 py-3 rounded-lg font-medium transition"
          >
            Xem đơn hàng của tôi
          </Link>
        </div>

        {/* Footer note */}
        <p className="text-xs text-gray-400 mt-6">
          Nếu bạn có bất kỳ thắc mắc nào, vui lòng liên hệ bộ phận hỗ trợ.
        </p>
      </div>
    </div>
  );
}
