import React from "react";
import { User, Mail, Phone, MapPin, Key, Shield } from "lucide-react";
export default function AccountForm({
  form,
  roles,
  onChange,
  onSubmit,
  onCancel,
  isEdit,
}) {
  return (
    <form
      onSubmit={onSubmit}
      className="bg-white p-6 rounded-2xl shadow-lg mt-6 border border-gray-100"
    >
      <h2 className="text-xl font-bold mb-4 text-blue-700 flex items-center gap-2">
        <Shield size={22} />
        {isEdit ? "Cập nhật tài khoản" : "Tạo tài khoản mới"}
      </h2>
      <div className="grid grid-cols-2 gap-5">
        <div className="flex flex-col">
          <label className="font-medium mb-1">Họ và tên</label>
          <div className="flex items-center border rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-blue-400">
            <User size={18} className="text-gray-500 mr-2" />
            <input
              className="w-full outline-none"
              placeholder="Nhập họ tên"
              name="HoTen"
              value={form.HoTen || ""}
              onChange={onChange}
              required
            />
          </div>
        </div>
        <div className="flex flex-col">
          <label className="font-medium mb-1">Email</label>
          <div className="flex items-center border rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-blue-400">
            <Mail size={18} className="text-gray-500 mr-2" />
            <input
              className="w-full outline-none"
              placeholder="email@domain.com"
              type="email"
              name="Email"
              value={form.Email || ""}
              onChange={onChange}
              required
            />
          </div>
        </div>
        <div className="flex flex-col">
          <label className="font-medium mb-1">Số điện thoại</label>
          <div className="flex items-center border rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-blue-400">
            <Phone size={18} className="text-gray-500 mr-2" />
            <input
              className="w-full outline-none"
              placeholder="0123 456 789"
              name="SoDienThoai"
              value={form.SoDienThoai || ""}
              onChange={onChange}
            />
          </div>
        </div>
        <div className="flex flex-col">
          <label className="font-medium mb-1">Địa chỉ</label>
          <div className="flex items-center border rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-blue-400">
            <MapPin size={18} className="text-gray-500 mr-2" />
            <input
              className="w-full outline-none"
              placeholder="Nhập địa chỉ"
              name="DiaChi"
              value={form.DiaChi || ""}
              onChange={onChange}
            />
          </div>
        </div>
        {!isEdit && (
          <div className="flex flex-col">
            <label className="font-medium mb-1">Mật khẩu</label>
            <div className="flex items-center border rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-blue-400">
              <Key size={18} className="text-gray-500 mr-2" />
              <input
                className="w-full outline-none"
                type="password"
                placeholder="Nhập mật khẩu"
                name="MatKhau"
                value={form.MatKhau || ""}
                onChange={onChange}
                required
              />
            </div>
          </div>
        )}
        <div className="flex flex-col">
          <label className="font-medium mb-1">Vai trò</label>
          <div className="border rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-blue-400">
            <select
              name="VaiTroId"
              className="w-full outline-none bg-transparent"
              value={form.VaiTroId || ""}
              onChange={onChange}
              required
            >
              <option value="">— Chọn vai trò —</option>
              {roles.map((role) => (
                <option key={role.Id} value={role.Id}>
                  {role.Ten}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      <div className="mt-6 flex gap-4">
        <button
          type="submit"
          className="flex-1 py-3 bg-linear-to-r from-blue-600 to-green-500 text-white rounded-lg font-semibold shadow hover:opacity-90 transition"
        >
          {isEdit ? "Cập nhật tài khoản" : "Tạo mới tài khoản"}
        </button>

        <button
          type="button"
          onClick={onCancel}
          className="flex-1 py-3 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition"
        >
          Hủy
        </button>
      </div>
    </form>
  );
}
