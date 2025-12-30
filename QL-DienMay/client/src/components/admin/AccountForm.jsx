import React from "react";
import { useBranches } from "../../context/BranchContext";
import { User, Mail, Phone, MapPin, Key, Shield } from "lucide-react";

export default function AccountForm({
  form,
  roles,
  onChange,
  onSubmit,
  onCancel,
  isEdit,
}) {
  const { branches } = useBranches();

  // Vai trò đang được chọn
  const selectedRole = roles.find(
    (role) => role.Id === Number(form.VaiTroId)
  );

  // Các vai trò KHÔNG cần chọn chi nhánh
  const rolesWithoutBranch = [
    "Admin",
    "KhachHang",
    "KhachVangLai",
  ];

  // Các vai trò BẮT BUỘC phải chọn chi nhánh
  const rolesRequireBranch = [
    "QuanLy",
    "NhanVienBanHang",
    "NhanVienKhoTong",
    "NhanVienKhoChiNhanh",
  ];

  // Kiểm tra có cần hiển thị chọn chi nhánh hay không
  const isStaffOrManager =
    selectedRole &&
    rolesRequireBranch.includes(selectedRole.Ten);

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
        {/* Họ và tên */}
        <div className="flex flex-col">
          <label className="font-medium mb-1">Họ và tên</label>
          <div className="flex items-center border rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-blue-400">
            <User size={18} className="text-gray-500 mr-2" />
            <input
              className="w-full outline-none"
              placeholder="Nhập họ và tên"
              name="HoTen"
              value={form.HoTen || ""}
              onChange={onChange}
              required
            />
          </div>
        </div>

        {/* Email */}
        <div className="flex flex-col">
          <label className="font-medium mb-1">Email</label>
          <div className="flex items-center border rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-blue-400">
            <Mail size={18} className="text-gray-500 mr-2" />
            <input
              type="email"
              className="w-full outline-none"
              placeholder="email@domain.com"
              name="Email"
              value={form.Email || ""}
              onChange={onChange}
              required
            />
          </div>
        </div>

        {/* Số điện thoại */}
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

        {/* Địa chỉ */}
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

        {/* Mật khẩu (chỉ khi tạo mới) */}
        {!isEdit && (
          <div className="flex flex-col">
            <label className="font-medium mb-1">Mật khẩu</label>
            <div className="flex items-center border rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-blue-400">
              <Key size={18} className="text-gray-500 mr-2" />
              <input
                type="password"
                className="w-full outline-none"
                placeholder="Nhập mật khẩu"
                name="MatKhau"
                value={form.MatKhau || ""}
                onChange={onChange}
                required
              />
            </div>
          </div>
        )}

        {/* Vai trò */}
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

      {/* Chọn chi nhánh (CHỈ cho nhân viên / quản lý) */}
      {isStaffOrManager && (
        <div className="flex flex-col mt-4">
          <label className="font-medium mb-1">
            Chi nhánh làm việc
          </label>
          <select
            name="ChiNhanhId"
            value={form.ChiNhanhId || ""}
            onChange={onChange}
            required
            className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400"
          >
            <option value="">
              — Vui lòng chọn chi nhánh —
            </option>
            {branches.map((branch) => (
              <option key={branch.Id} value={branch.Id}>
                {branch.Ten}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Nút hành động */}
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
