import { useNavigate, Link } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { User, LogOut } from "lucide-react";
// import { useAuth } from "../../context/AuthContext";

export default function HeaderAdmin() {
  const [user, setUser] = useState(null);
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);
  // const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = sessionStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));

    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    // logout();
    navigate("/");
  };

  return (
    <header className="bg-white border-b border-gray-200 shadow-md sticky top-0 z-50">
      <div className="max-w-[1400px] mx-auto flex items-center justify-between px-6 py-3">
        {/* Logo */}
        <Link to="/admin/dashboard" className="flex items-center gap-2">
          <h2 className="text-3xl sm:text-4xl font-bold text-green-700">
            HỆ THỐNG
          </h2>
          <span className="hidden sm:inline text-gray-500 font-medium">
            Quản lý Admin
          </span>
        </Link>

        {/* User dropdown */}
        {user && (
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setOpen(!open)}
              className="flex items-center gap-3 px-4 py-2 rounded-full bg-gray-100 hover:bg-gray-200 transition shadow-sm"
            >
              <img
                src={
                  user.imageUrl ||
                  "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=50"
                }
                alt={user.name}
                className="w-10 h-10 rounded-full border-2 border-green-500 object-cover"
              />
              <span className="font-semibold text-gray-800">{user.name}</span>
            </button>

            {open && (
              <ul className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden animate-fade-in">
                <li>
                  <Link
                    to="/admin/profile"
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-2 px-4 py-3 hover:bg-gray-50 transition"
                  >
                    <User size={18} className="text-green-600" /> Hồ sơ
                  </Link>
                </li>
                <li
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-4 py-3 hover:bg-gray-50 cursor-pointer transition text-red-500"
                >
                  <LogOut size={18} /> Đăng xuất
                </li>
              </ul>
            )}
          </div>
        )}
      </div>
    </header>
  );
}
