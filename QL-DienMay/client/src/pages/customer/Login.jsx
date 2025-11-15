import { Link } from "react-router-dom";
import Meta from "../../components/Meta";
import { useState } from "react";

export default function Login() {
  const [form, setForm] = useState({ Email: "", MatKhau: "" });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!form.Email.trim()) newErrors.Email = "Email là bắt buộc";
    if (!form.MatKhau.trim()) newErrors.MatKhau = "Mật khẩu là bắt buộc";
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      console.log("Login data:", form);
      alert("Đăng nhập thành công (chỉ demo UI)!");
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
            <div className="flex flex-col mb-5">
              <div
                className={`${inputWrapperClass} ${
                  errors.Email ? "border-red-500" : ""
                }`}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 15 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="m2.5 4.375 3.875 2.906c.667.5 1.583.5 2.25 0L12.5 4.375"
                    stroke="#6B7280"
                    strokeOpacity=".6"
                    strokeWidth="1.3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M11.875 3.125h-8.75c-.69 0-1.25.56-1.25 1.25v6.25c0 .69.56 1.25 1.25 1.25h8.75c.69 0 1.25-.56 1.25-1.25v-6.25c0-.69-.56-1.25-1.25-1.25Z"
                    stroke="#6B7280"
                    strokeOpacity=".6"
                    strokeWidth="1.3"
                    strokeLinecap="round"
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
              {errors.Email && (
                <span className="text-red-500 text-sm mt-1">
                  {errors.Email}
                </span>
              )}
            </div>
            <div className="flex flex-col mb-5">
              <div
                className={`${inputWrapperClass} ${
                  errors.MatKhau ? "border-red-500" : ""
                }`}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 15 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="m2.5 4.375 3.875 2.906c.667.5 1.583.5 2.25 0L12.5 4.375"
                    stroke="#6B7280"
                    strokeOpacity=".6"
                    strokeWidth="1.3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M11.875 3.125h-8.75c-.69 0-1.25.56-1.25 1.25v6.25c0 .69.56 1.25 1.25 1.25h8.75c.69 0 1.25-.56 1.25-1.25v-6.25c0-.69-.56-1.25-1.25-1.25Z"
                    stroke="#6B7280"
                    strokeOpacity=".6"
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
              {errors.MatKhau && (
                <span className="text-red-500 text-sm mt-1">
                  {errors.MatKhau}
                </span>
              )}
            </div>

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
