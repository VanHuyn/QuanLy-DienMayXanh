import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, ShoppingCart, User, Menu, X } from "lucide-react";
import MegaMenuHeader from "./MegaMenuHeader";
import MegaMenu from "./MegaMenuHeader"; // đảm bảo import MegaMenu nếu dùng
import { menuHeader } from "../../data";

export default function Header() {
const [menuOpen, setMenuOpen] = useState(false);

return ( 
  <header className="w-full shadow-md bg-white sticky top-0 z-50">
    <div className="bg-top-header hidden md:flex justify-center items-center"> 
      <img
          className="h-11 object-contain"
          src="https://cdnv2.tgdd.vn/mwg-static/dmx/Banner/f9/11/f91157bf1f48f277ba9a864acd5f1ea0.png"
          alt="Banner"
        /> 
    </div>
    <div className="bg-primary text-white h-16">
      <div className="max-w-7xl mx-auto flex justify-between items-center h-full px-4">
        <Link to="/" className="flex items-center shrink-0">
          <img
            className="w-40 sm:w-[190px] md:w-[210px] h-10 object-contain"
            src="https://hienlaptop.com/wp-content/uploads/2024/10/d936cdcc28e1f6d50c8b30eef7255d3d.png"
            alt="Logo"
          />
        </Link>
        {/* Menu Desktop */}
        <div className="hidden lg:flex items-center gap-6 flex-1 justify-center">
          <MegaMenuHeader />
          <div className="relative w-[420px] xl:w-[480px] group">
            <div className="flex items-center bg-white rounded-full overflow-hidden shadow-[0_2px_6px_rgba(0,0,0,0.1)] focus-within:shadow-[0_0_0_3px_rgba(255,213,0,0.6)] transition-all duration-200">
              <Search
                size={20}
                className="text-gray-500 ml-4 group-focus-within:text-yellow-500 transition"
              />
              <input
                type="text"
                placeholder="Tìm kiếm sản phẩm, thương hiệu..."
                className="flex-1 px-3 py-2 text-gray-800 placeholder-gray-500 bg-transparent outline-none text-sm"
              />
              <button
                className="flex items-center gap-1 bg-linear-to-r from-yellow-400 to-yellow-500 
                        hover:from-yellow-500 hover:to-yellow-600 
                        text-black font-semibold text-sm cursor-pointer
                          px-4 py-1.5 rounded-full 
                          shadow-md hover:shadow-lg 
                          transform hover:-translate-y-px active:translate-y-1px
                          transition-all duration-200 ease-in-out border border-yellow-300 mr-1"
              >
                <Search size={16} />
                <span>Tìm kiếm</span>
              </button>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Link
            to="/dang-nhap"
            className="flex items-center gap-1 hover:text-yellow-300 transition"
          >
            <User size={20} />
            <span className="text-sm font-medium hidden sm:inline">
              Đăng nhập
            </span>
          </Link>

          <Link
            to="/gio-hang"
            className="relative flex items-center gap-1 hover:text-yellow-300 transition"
          >
            <ShoppingCart size={20} />
            <span className="hidden sm:inline text-sm font-medium">
              Giỏ hàng
            </span>
            <span className="absolute -top-1.5 -right-3 bg-white text-red-600 text-[11px] font-bold px-1.5 h-[18px] min-w-[18px] flex items-center justify-center rounded-full shadow-sm border border-red-500">
              2
            </span>
          </Link>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden flex items-center justify-center text-white"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
    </div>
    <div className="hidden md:block max-w-5xl mx-auto border-t border-gray-200">
      <div className="flex justify-between px-4 py-2 text-sm font-medium text-gray-700">
        {menuHeader.map((e, index) => (
          <Link
            to={e.url}
            key={index}
            className="hover:text-primary hover:underline transition"
          >
            {e.title}
          </Link>
        ))}
      </div>
    </div>

    {menuOpen && (
      <div className="lg:hidden bg-white border-t border-gray-200 animate-fadeIn">
        <div className="p-4 space-y-4">
          <div className="relative w-full">
            <div className="flex items-center bg-gray-100 rounded-full overflow-hidden shadow-sm">
              <Search size={18} className="text-gray-500 ml-3" />
              <input
                type="text"
                placeholder="Tìm kiếm sản phẩm..."
                className="flex-1 px-2 py-2 text-gray-800 bg-transparent outline-none text-sm"
              />
              <button className="px-3 text-yellow-600 font-semibold hover:text-yellow-700">
                Tìm
              </button>
            </div>
          </div>
          <MegaMenu mobile />
          <div className="grid grid-cols-2 gap-3 text-center text-sm font-medium">
            {menuHeader.map((e, index) => (
              <Link
                to={e.url}
                key={index}
                className="block bg-gray-50 hover:bg-yellow-100 rounded-md py-2 text-gray-700"
              >
                {e.title}
              </Link>
            ))}
          </div>
        </div>
      </div>
    )}
  </header>
);
}
