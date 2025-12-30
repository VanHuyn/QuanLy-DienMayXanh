import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { User, LogOut } from "lucide-react";
import { menuCentralWarehouse  } from "../../data/index";
import useAuth from "../../hooks/useAuth";
export default function WarehouseLayout() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    await logout();
    navigate("/dang-nhap");
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50 flex justify-between items-center px-6 py-3">
        {/* Logo */}
        <Link to="/warehouse/dashboard" className="flex items-center gap-2">
          <h2 className="text-2xl font-bold text-blue-700">HỆ THỐNG</h2>
          <span className="text-gray-500 font-medium hidden sm:inline">
            Quản lý kho tổng
          </span>
        </Link>

        {/* User dropdown */}
        {user && (
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setOpen(!open)}
              className="flex items-center gap-3 bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-full transition"
            >
              <img
                src={
                  user.imageUrl ||
                  "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=50"
                }
                alt={user.name}
                className="w-9 h-9 rounded-full border-2 border-blue-700 object-cover"
              />
              <span className="font-semibold text-gray-800">{user.name}</span>
            </button>

            {open && (
              <ul className="absolute right-0 mt-2 w-44 bg-white border rounded-xl shadow-lg overflow-hidden">
                <li>
                  <Link
                    to="/warehouse/profile"
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-2 px-4 py-3 hover:bg-gray-50"
                  >
                    <User size={18} className="text-blue-700" /> Hồ sơ
                  </Link>
                </li>
                <li
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-4 py-3 text-red-500 hover:bg-gray-50 cursor-pointer"
                >
                  <LogOut size={18} /> Đăng xuất
                </li>
              </ul>
            )}
          </div>
        )}
      </header>

      {/* Layout */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="w-60 bg-white border-r border-gray-200 p-4 flex flex-col gap-1">
          {menuCentralWarehouse .map((item,index) => {
            const Icon = item.icon;
            return (
              <Link
                key={index}
                to={item.path}
                className={`flex items-center gap-3 px-3 py-3 rounded-md font-medium transition-colors duration-200 border-l-4 ${
                  location.pathname === item.path
                    ? "bg-indigo-100 text-indigo-700 border-indigo-500"
                    : "text-gray-700 border-transparent hover:bg-indigo-50 hover:text-indigo-600 hover:border-indigo-300"
                }`}
              >
                <Icon size={18} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </aside>

        {/* Nội dung */}
        <main className="flex-1 p-6 bg-gray-50">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
