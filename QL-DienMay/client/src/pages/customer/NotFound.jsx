import { Link } from "react-router-dom";
import { Home, Search } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden text-center">
      <div className="absolute inset-0 bg-linear-to-br from-[#cce7ff] via-[#eaf7ff] to-white animate-gradientMove"></div>
      <div className="absolute top-1/2 left-1/2 w-[600px] h-[600px] bg-[#00aaff33] rounded-full blur-[150px] -translate-x-1/2 -translate-y-1/2 animate-pulse-slow"></div>
      <div className="relative z-10 px-4">
        <h1 className="text-[140px] md:text-[200px] font-extrabold bg-linear-to-r from-[#0066cc] via-[#00b4ff] to-[#FFD400] bg-clip-text text-transparent drop-shadow-[0_8px_10px_rgba(0,0,0,0.2)] animate-textGlow">
          404
        </h1>
        <h2 className="text-3xl md:text-4xl font-bold text-[#0066cc] mt-2 mb-3 drop-shadow-sm">
          Trang bạn tìm kiếm không tồn tại 😢
        </h2>
        <p className="text-gray-600 max-w-lg mx-auto mb-8 text-base leading-relaxed">
          Có thể sản phẩm đã bị gỡ hoặc bạn nhập sai địa chỉ.  
          Hãy quay lại để tiếp tục mua sắm cùng{" "}
          <span className="text-[#0066cc] font-semibold">Điện Máy Xanh</span> nhé!
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            to="/"
            className="flex items-center gap-2 bg-[#0066cc] text-white px-6 py-2.5 rounded-full font-semibold shadow-lg hover:scale-105 hover:bg-[#0052a3] transition-all duration-300"
          >
            <Home size={18} />
            Về trang chủ
          </Link>

          <Link
            to="/tim-kiem"
            className="flex items-center gap-2 bg-linear-to-r from-yellow-400 to-yellow-500 
            text-black px-6 py-2.5 rounded-full font-semibold shadow-lg hover:scale-105 hover:from-yellow-500 hover:to-yellow-600 transition-all duration-300"
          >
            <Search size={18} />
            Tìm sản phẩm khác
          </Link>
        </div>

        <div className="mt-12 text-gray-500 text-sm">
          © {new Date().getFullYear()} Điện Máy Xanh – Mua sắm tiện lợi, giá tốt mỗi ngày 💛
        </div>
      </div>

     
    </div>
  );
}
