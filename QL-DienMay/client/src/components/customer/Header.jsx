import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Search,
  ShoppingCart,
  User,
  Menu,
  X,
  ChevronDown,
  UserCircle,
  History,
  LogOut,
} from "lucide-react";
import MegaMenuHeader from "./MegaMenuHeader";
import { menuHeader } from "../../data";
import useAuth from "../../hooks/useAuth";
import { useCart } from "../../context/CartContext";
export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { cart } = useCart();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const totalItems = cart?.ChiTietGioHangs?.length || 0;

  const handleLogout = async () => {
    await logout();
    navigate("/dang-nhap");
  };

  useEffect(() => {
    setDropdownOpen(false);
  }, [user]);

  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  console.log(totalItems);
  return (
    <header className="w-full bg-white shadow-md sticky top-0 z-50">
      {/* BANNER */}
      <div className="bg-top-header hidden md:flex justify-center items-center">
        <img
          className="h-11 object-contain"
          src="https://cdnv2.tgdd.vn/mwg-static/dmx/Banner/f9/11/f91157bf1f48f277ba9a864acd5f1ea0.png"
          alt="banner"
        />
      </div>

      {/* HEADER MAIN */}
      <div className="bg-primary text-white h-16 flex items-center">
        <div className="max-w-7xl mx-auto w-full flex justify-between items-center px-4">
          {/* LOGO */}
          <Link to="/" className="flex items-center shrink-0">
            <img
              className="w-40 sm:w-48 md:w-52 h-10 object-contain"
              src="https://hienlaptop.com/wp-content/uploads/2024/10/d936cdcc28e1f6d50c8b30eef7255d3d.png"
              alt="Logo"
            />
          </Link>

          {/* DESKTOP NAV */}
          <div className="hidden lg:flex items-center gap-6 flex-1 justify-center">
            <MegaMenuHeader />

            {/* SEARCH BAR */}
            <div className="relative w-[420px] xl:w-[480px]">
              <div className="flex items-center bg-white rounded-full shadow-sm overflow-hidden border border-gray-200 focus-within:shadow-lg transition">
                <Search size={20} className="text-gray-500 ml-4" />
                <input
                  type="text"
                  className="flex-1 px-3 py-2 text-gray-800 bg-transparent outline-none text-sm"
                  placeholder="Tìm kiếm sản phẩm, thương hiệu..."
                />
                <button className="flex items-center gap-1 bg-yellow-400 hover:bg-yellow-500 text-black font-semibold text-sm px-4 py-1.5 rounded-full">
                  <Search size={16} />
                  <span>Tìm</span>
                </button>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            {!user && (
              <Link
                to="/dang-nhap"
                className="flex items-center gap-1 hover:text-yellow-300 transition"
              >
                <User size={20} />
                <span className="text-sm hidden sm:inline">Đăng nhập</span>
              </Link>
            )}
            {user && (
              <div ref={dropdownRef} className="relative">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-2 group transition"
                >
                  <img
                    src="https://i.pravatar.cc/50"
                    alt="avatar"
                    className="w-9 h-9 rounded-full border border-white/30 shadow group-hover:shadow-md transition-all"
                  />
                  <span className="text-sm hidden sm:inline group-hover:text-yellow-300">
                    {user.HoTen}
                  </span>
                  <ChevronDown size={16} />
                </button>
                {dropdownOpen && (
                  <div className="absolute right-0 mt-3 w-56 bg-white rounded-xl shadow-xl border border-gray-100 animate-dropdown overflow-hidden z-50">
                    <Link
                      to="/thong-tin-ca-nhan"
                      onClick={() => setDropdownOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-100 transition"
                    >
                      <UserCircle size={20} />
                      <span>Thông tin cá nhân</span>
                    </Link>

                    <Link
                      to="/lich-su-don-hang"
                      onClick={() => setDropdownOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-100 transition"
                    >
                      <History size={20} />
                      <span>Lịch sử đơn hàng</span>
                    </Link>

                    <button
                      onClick={handleLogout}
                      className="flex items-center cursor-pointer gap-3 w-full px-4 py-3 text-red-600 hover:bg-red-50 transition"
                    >
                      <LogOut size={20} />
                      <span>Đăng xuất</span>
                    </button>
                  </div>
                )}
              </div>
            )}
            <Link
              to="/gio-hang"
              className="relative flex items-center gap-1 hover:text-yellow-300 transition"
            >
              <ShoppingCart size={20} />
              <span className="hidden sm:inline text-sm">Giỏ hàng</span>
              <span className="absolute -top-1.5 -right-4 bg-white text-red-600 text-[11px] font-bold px-1.5 h-[18px] min-w-[18px] flex items-center justify-center rounded-full border border-red-500">
                {totalItems}
              </span>
            </Link>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden"
            >
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      <div className="hidden md:block max-w-5xl mx-auto border-t border-gray-200">
        <div className="flex justify-between px-4 py-2 text-sm text-gray-700">
          {menuHeader.map((e, i) => (
            <Link
              key={i}
              to={e.url}
              className="hover:text-primary hover:underline transition"
            >
              {e.title}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}
