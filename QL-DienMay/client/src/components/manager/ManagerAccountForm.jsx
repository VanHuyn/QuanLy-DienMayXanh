import React from "react";
import { User, Mail, Phone, MapPin, Key, Shield } from "lucide-react";

export default function ManagerAccountForm({
  form,
  roles,
  onChange,
  onSubmit,
  onCancel,
  isEdit,
  managerBranch,
}) {
  console.log(form)
  return (
    <form
      onSubmit={onSubmit}
      className="bg-white p-6 rounded-2xl shadow-lg mt-6 border border-gray-100"
    >
      <h2 className="text-xl font-bold mb-4 text-green-700 flex items-center gap-2">
        <Shield size={22} />
        {isEdit ? "Cập nhật nhân viên" : "Thêm nhân viên mới"}
      </h2>

      <div className="grid grid-cols-2 gap-5">
        {/* Họ tên */}
        <div className="flex flex-col">
          <label className="font-medium mb-1">Họ và tên</label>
          <div className="flex items-center border rounded-lg px-3 py-2">
            <User size={18} className="text-gray-500 mr-2" />
            <input
              name="HoTen"
              value={form.HoTen || ""}
              onChange={onChange}
              required
              className="w-full outline-none"
              placeholder="Nhập họ tên"
            />
          </div>
        </div>

        {/* Email */}
        <div className="flex flex-col">
          <label className="font-medium mb-1">Email</label>
          <div className="flex items-center border rounded-lg px-3 py-2">
            <Mail size={18} className="text-gray-500 mr-2" />
            <input
              type="email"
              name="Email"
              value={form.Email || ""}
              onChange={onChange}
              required
              className="w-full outline-none"
            />
          </div>
        </div>

        {/* Số điện thoại */}
        <div className="flex flex-col">
          <label className="font-medium mb-1">Số điện thoại</label>
          <div className="flex items-center border rounded-lg px-3 py-2">
            <Phone size={18} className="text-gray-500 mr-2" />
            <input
              name="SoDienThoai"
              value={form.SoDienThoai || ""}
              onChange={onChange}
              className="w-full outline-none"
            />
          </div>
        </div>

        {/* Địa chỉ */}
        <div className="flex flex-col">
          <label className="font-medium mb-1">Địa chỉ</label>
          <div className="flex items-center border rounded-lg px-3 py-2">
            <MapPin size={18} className="text-gray-500 mr-2" />
            <input
              name="DiaChi"
              value={form.DiaChi || ""}
              onChange={onChange}
              className="w-full outline-none"
            />
          </div>
        </div>

        {/* Mật khẩu – chỉ khi tạo mới */}
        {!isEdit && (
          <div className="flex flex-col">
            <label className="font-medium mb-1">Mật khẩu</label>
            <div className="flex items-center border rounded-lg px-3 py-2">
              <Key size={18} className="text-gray-500 mr-2" />
              <input
                type="password"
                name="MatKhau"
                value={form.MatKhau || ""}
                onChange={onChange}
                required
                className="w-full outline-none"
              />
            </div>
          </div>
        )}

        {/* Vai trò */}
        <div className="flex flex-col">
          <label className="font-medium mb-1">Vai trò</label>
          <select
            name="VaiTroId"
            value={form.VaiTroId || ""}
            onChange={onChange}
            required
            className="border rounded-lg px-3 py-2"
          >
            <option value="">— Chọn vai trò —</option>
            {roles.map((r) => (
              <option key={r.Id} value={r.Id}>
                {r.Ten}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Chi nhánh – CHỈ HIỂN THỊ */}
      <div className="mt-4">
        <label className="font-medium mb-1 block">
          Chi nhánh làm việc
        </label>
        <input
          disabled
          value={managerBranch?.Ten || ""}
          className="w-full border px-3 py-2 rounded bg-gray-100"
        />
      </div>

      <div className="mt-6 flex gap-4">
        <button
          type="submit"
          className="flex-1 py-3 bg-green-600 text-white rounded-lg font-semibold"
        >
          {isEdit ? "Cập nhật" : "Thêm nhân viên"}
        </button>

        <button
          type="button"
          onClick={onCancel}
          className="flex-1 py-3 bg-gray-200 rounded-lg"
        >
          Huỷ
        </button>
      </div>
    </form>
  );
}
