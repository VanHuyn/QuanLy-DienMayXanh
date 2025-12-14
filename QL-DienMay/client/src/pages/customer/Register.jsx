import { Link, useNavigate } from "react-router-dom";
import Meta from "../../components/Meta";
import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";

export default function Register() {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [form, setForm] = useState({
    HoTen: "",
    Email: "",
    MatKhau: "",
    SoDienThoai: "",
    DiaChi: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validate = () => {
    const newErrors = {};

    if (!form.HoTen.trim()) newErrors.HoTen = "Họ và tên là bắt buộc";
    if (!form.Email.trim()) newErrors.Email = "Email là bắt buộc";
    else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(form.Email))
      newErrors.Email = "Email không hợp lệ";

    if (!form.MatKhau.trim()) newErrors.MatKhau = "Mật khẩu là bắt buộc";
    else if (form.MatKhau.length < 6)
      newErrors.MatKhau = "Mật khẩu tối thiểu 6 ký tự";

    if (!form.SoDienThoai.trim())
      newErrors.SoDienThoai = "Số điện thoại là bắt buộc";
    else if (!/^(0|\+84)\d{9}$/g.test(form.SoDienThoai))
      newErrors.SoDienThoai = "Số điện thoại không hợp lệ";

    if (!form.DiaChi.trim()) newErrors.DiaChi = "Địa chỉ là bắt buộc";

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validate();
    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;

    try {
      setLoading(true);
      await register(form);

      toast.success("Đăng ký thành công!");
      navigate("/dang-nhap");

      setForm({
        HoTen: "",
        Email: "",
        MatKhau: "",
        SoDienThoai: "",
        DiaChi: "",
      });
    } catch (err) {
      const msg = err.response?.data?.message || "Đăng ký thất bại!";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  const inputWrapperClass =
    "flex items-center border bg-indigo-500/5 border-gray-300 rounded gap-2 px-3";

  const inputClass = "w-full py-3 outline-none bg-transparent";

  return (
    <div className="max-w-7xl mx-auto px-4">
      <Meta title="Đăng ký tài khoản Điện Máy Xanh" description="Register" />

      <div className="flex flex-col md:flex-row py-10 md:py-20 gap-8 items-center">
        {/* Ảnh minh họa */}
        <div className="w-full md:w-1/2">
          <img
            src="https://cdn.tgdd.vn/2022/10/banner/TGDD-540x270-1.png"
            alt="Đăng ký"
            className="w-full rounded-xl"
          />
        </div>

        {/* Form */}
        <div className="w-full md:w-1/2">
          <form
            onSubmit={handleSubmit}
            className="bg-white shadow-lg rounded-lg p-6 md:p-8 flex flex-col gap-4"
          >
            <h2 className="text-3xl font-bold text-center mb-6">
              Đăng ký tài khoản
            </h2>

            {/* Họ Tên */}
            <div className={`${inputWrapperClass} ${errors.HoTen ? "border-red-500" : ""}`}>
              <input
                type="text"
                name="HoTen"
                placeholder="Họ và tên"
                value={form.HoTen}
                onChange={handleChange}
                className={inputClass}
              />
            </div>
            {errors.HoTen && <span className="text-red-500 text-sm">{errors.HoTen}</span>}

            {/* Email */}
            <div className={`${inputWrapperClass} ${errors.Email ? "border-red-500" : ""}`}>
              <input
                type="email"
                name="Email"
                placeholder="Email"
                value={form.Email}
                onChange={handleChange}
                className={inputClass}
              />
            </div>
            {errors.Email && <span className="text-red-500 text-sm">{errors.Email}</span>}

            {/* Mật khẩu */}
            <div className={`${inputWrapperClass} ${errors.MatKhau ? "border-red-500" : ""}`}>
              <input
                type="password"
                name="MatKhau"
                placeholder="Mật khẩu"
                value={form.MatKhau}
                onChange={handleChange}
                className={inputClass}
              />
            </div>
            {errors.MatKhau && <span className="text-red-500 text-sm">{errors.MatKhau}</span>}

            {/* Số điện thoại */}
            <div className={`${inputWrapperClass} ${errors.SoDienThoai ? "border-red-500" : ""}`}>
              <input
                type="text"
                name="SoDienThoai"
                placeholder="Số điện thoại"
                value={form.SoDienThoai}
                onChange={handleChange}
                className={inputClass}
              />
            </div>
            {errors.SoDienThoai && (
              <span className="text-red-500 text-sm">{errors.SoDienThoai}</span>
            )}

            {/* Địa chỉ */}
            <div className={`${inputWrapperClass} ${errors.DiaChi ? "border-red-500" : ""}`}>
              <input
                type="text"
                name="DiaChi"
                placeholder="Địa chỉ"
                value={form.DiaChi}
                onChange={handleChange}
                className={inputClass}
              />
            </div>
            {errors.DiaChi && <span className="text-red-500 text-sm">{errors.DiaChi}</span>}

            <p className="text-end text-sm my-2">
              Bạn đã có tài khoản?{" "}
              <Link to="/dang-nhap" className="text-blue-500 underline">
                Đăng nhập
              </Link>
            </p>

            <button
              type="submit"
              disabled={loading}
              className="mt-3 w-full bg-indigo-500 hover:bg-indigo-600 text-white py-3 rounded-lg transition-all"
            >
              {loading ? "Đang xử lý..." : "Đăng ký"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
