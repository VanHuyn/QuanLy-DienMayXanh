import { Link } from "react-router-dom";
import Meta from "../../components/Meta";
import { useState } from "react";

export default function Register() {
  const [form, setForm] = useState({
    HoTen: "",
    Email: "",
    MatKhau: "",
    SoDienThoai: "",
    DiaChi: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!form.HoTen.trim()) newErrors.HoTen = "Họ và tên là bắt buộc";
    if (!form.Email.trim()) newErrors.Email = "Email là bắt buộc";
    if (!form.MatKhau.trim()) newErrors.MatKhau = "Mật khẩu là bắt buộc";
    if (!form.SoDienThoai.trim())
      newErrors.SoDienThoai = "Số điện thoại là bắt buộc";
    if (!form.DiaChi.trim()) newErrors.DiaChi = "Địa chỉ là bắt buộc";

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      console.log("Form data:", form);
      alert("Đăng ký thành công (chỉ demo UI)!");
      setForm({
        HoTen: "",
        Email: "",
        MatKhau: "",
        SoDienThoai: "",
        DiaChi: "",
      });
    }
  };

  const inputWrapperClass =
    "flex items-center border bg-indigo-500/5 border-gray-300 rounded gap-2 px-3";

  const inputClass = "w-full py-3 outline-none bg-transparent";

  return (
    <div className="max-w-7xl mx-auto px-4">
      <Meta
        title="Đăng ký tài khoản Điện Máy Xanh"
        description="Đăng ký tài khoản Điện Máy Xanh"
      />
      <div className="flex flex-col md:flex-row py-10 md:py-20 gap-8 items-center">
        <div className="w-full md:w-1/2">
          <img
            src="https://cdn.tgdd.vn/2022/10/banner/TGDD-540x270-1.png"
            alt="Đăng ký"
            className="w-full rounded-xl"
          />
        </div>
        <div className="w-full md:w-1/2">
          <form
            onSubmit={handleSubmit}
            className="bg-white shadow-lg rounded-lg p-6 md:p-8 flex flex-col gap-4"
          >
            <h2 className="text-3xl font-bold text-center mb-6">
              Đăng ký tài khoản
            </h2>

            <div className={`${inputWrapperClass} ${errors.HoTen ? "border-red-500" : ""}`}>
              <svg
                width="20"
                height="20"
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7.5 7.5c1.5 0 2.5-1 2.5-2.5S9 2.5 7.5 2.5 5 3.5 5 5s1 2.5 2.5 2.5z"
                  stroke="#6B7280"
                  strokeWidth="1.3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M2.5 12.5c0-2.5 5-2.5 5-2.5s5 0 5 2.5v0h-10z"
                  stroke="#6B7280"
                  strokeWidth="1.3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
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

            <div className={`${inputWrapperClass} ${errors.Email ? "border-red-500" : ""}`}>
              <svg
                width="20"
                height="20"
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2 4.5l5.5 3.5L13 4.5"
                  stroke="#6B7280"
                  strokeWidth="1.3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <rect
                  x="2"
                  y="3"
                  width="11"
                  height="8"
                  rx="1.5"
                  stroke="#6B7280"
                  strokeWidth="1.3"
                />
              </svg>
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

            <div className={`${inputWrapperClass} ${errors.MatKhau ? "border-red-500" : ""}`}>
              <svg
                width="20"
                height="20"
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  x="3"
                  y="6"
                  width="9"
                  height="6"
                  rx="1"
                  stroke="#6B7280"
                  strokeWidth="1.3"
                />
                <path
                  d="M7.5 6V4.5a1.5 1.5 0 0 1 3 0V6"
                  stroke="#6B7280"
                  strokeWidth="1.3"
                  strokeLinecap="round"
                />
              </svg>
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
            {errors.SoDienThoai && <span className="text-red-500 text-sm">{errors.SoDienThoai}</span>}

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
              className="mt-3 w-full bg-indigo-500 hover:bg-indigo-600 text-white py-3 rounded-lg transition-all"
            >
              Đăng ký
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
