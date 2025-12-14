import { Link } from "react-router-dom";
import Meta from "../../components/Meta";
import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const { login } = useAuth();
  const [form, setForm] = useState({ Email: "", MatKhau: "" });
  const [errors, setErrors] = useState({});
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Kiểm tra rỗng
    const newErrors = {};
    if (!form.Email.trim()) newErrors.Email = "Email là bắt buộc";
    if (!form.MatKhau.trim()) newErrors.MatKhau = "Mật khẩu là bắt buộc";
    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;

    try {
      const user = await login(form.Email, form.MatKhau);

      const role = user?.VaiTro?.Ten;

      // Điều hướng theo vai trò
      if (["Admin", "QuanLy", "NhanVienBanHang", "NhanVienKhoTong", "NhanVienKhoChiNhanh"].includes(role)) {
        navigate("/admin");
      } else {
        navigate("/");
      }
    } catch (err) {
      setErrorMsg(err.response?.data?.message || "Đăng nhập thất bại");
    }
  };

  const inputWrapperClass =
    "flex items-center border bg-indigo-500/5 border-gray-500/10 rounded gap-2 px-3";
  const inputClass = "w-full py-3 outline-none bg-transparent";

  return (
    <div className="max-w-7xl mx-auto px-4">
      <Meta
        title="Đăng nhập tài khoản Điện Máy Xanh"
        description="Đăng nhập tài khoản Điện Máy Xanh"
      />

      <div className="flex flex-col md:flex-row py-10 md:py-40 gap-8 items-center">
        <div className="w-full md:w-1/2">
          <img
            src="https://cdn.tgdd.vn/2022/10/banner/TGDD-540x270-1.png"
            alt="Đăng nhập"
            className="w-full rounded-xl"
          />
        </div>

        <div className="w-full md:w-1/2">
          <form
            onSubmit={handleSubmit}
            className="bg-white text-gray-800 max-w-lg w-full mx-auto md:p-8 p-6 py-10 text-left text-sm rounded-lg shadow-lg"
          >
            <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">
              Đăng nhập
            </h2>

            {/* Email */}
            <div className="flex flex-col mb-5">
              <div
                className={`${inputWrapperClass} ${
                  errors.Email ? "border-red-500" : ""
                }`}
              >
                <input
                  type="email"
                  name="Email"
                  placeholder="Email"
                  value={form.Email}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>
              {errors.Email && (
                <span className="text-red-500 text-sm mt-1">
                  {errors.Email}
                </span>
              )}
            </div>

            {/* Password */}
            <div className="flex flex-col mb-5">
              <div
                className={`${inputWrapperClass} ${
                  errors.MatKhau ? "border-red-500" : ""
                }`}
              >
                <input
                  type="password"
                  name="MatKhau"
                  placeholder="Mật khẩu"
                  value={form.MatKhau}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>
              {errors.MatKhau && (
                <span className="text-red-500 text-sm mt-1">
                  {errors.MatKhau}
                </span>
              )}
            </div>

            {/* Error message */}
            {errorMsg && (
              <p className="text-red-600 text-center mb-3">{errorMsg}</p>
            )}

            <p className="text-end my-4">
              Bạn chưa có tài khoản?{" "}
              <Link to="/dang-ky" className="text-blue-500 underline">
                Đăng ký
              </Link>
            </p>

            <button className="w-full mb-3 bg-indigo-500 hover:bg-indigo-600 transition-all active:scale-95 py-3 rounded text-white font-medium">
              Đăng nhập
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
