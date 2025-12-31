import { createContext, useEffect, useState } from "react";
import authService from "../services/AuthServices";
import toast from "react-hot-toast";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("user");
    return saved ? JSON.parse(saved) : null;
  });

  const [loading, setLoading] = useState(true);

  // Lấy profile từ cookie (nếu bạn muốn bật lại thì mở comment)
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        // const res = await authService.getProfile();
        // setUser(res.user);
        // localStorage.setItem("user", JSON.stringify(res.user));
      } catch (err) {
        setUser(null);
        localStorage.removeItem("user");
      }
      setLoading(false);
    };

    fetchProfile();
  }, []);
  console.log(user)
  // đăng ký
  const register = async (formData) => {
    try {
      const res = await authService.register(formData);


      toast.success("Đăng ký thành công!");
      return res.user;
    } catch (err) {
      const msg = err.response?.data?.message || "Đăng ký thất bại!";
      toast.error(msg);
      throw err;
    }
  };

  // Đăng nhập
  const login = async (Email, MatKhau) => {
    try {
      const res = await authService.login(Email, MatKhau);

      setUser(res.user);
      localStorage.setItem("user", JSON.stringify(res.user));

      toast.success("Đăng nhập thành công!");
      return res.user; //  Trả user để Login.jsx dùng kiểm tra vai trò
    } catch (err) {
      const msg = err.response?.data?.message || "Đăng nhập thất bại!";
      toast.error(msg);
      throw err;
    }
  };

  // Đăng xuất
  const logout = async () => {
    try {
      await authService.logout();
      setUser(null);
      localStorage.removeItem("user");
      sessionStorage.removeItem("branchId");
      toast.success("Bạn đã đăng xuất!");
    } catch (err) {
      toast.error("Không thể đăng xuất!");
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout,register, loading }}>
      {children}
    </AuthContext.Provider>
  );
}
