import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import {
  User,
  Mail,
  Phone,
  MapPin,
  ShieldCheck,
  Calendar,
} from "lucide-react";

export default function AdminProfile() {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64 text-gray-500">
        Đang tải thông tin tài khoản...
      </div>
    );
  }

  if (!user) {
    return (
      <div className="text-center text-red-500">
        Không tìm thấy thông tin người dùng
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto bg-white p-6 rounded-2xl shadow-md border">
      <h1 className="text-2xl font-bold text-blue-700 mb-6 flex items-center gap-2">
        <ShieldCheck size={26} />
        Thông tin tài khoản Admin
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Họ tên */}
        <InfoItem
          icon={<User />}
          label="Họ và tên"
          value={user.HoTen}
        />

        {/* Email */}
        <InfoItem
          icon={<Mail />}
          label="Email"
          value={user.Email}
        />

        {/* Số điện thoại */}
        <InfoItem
          icon={<Phone />}
          label="Số điện thoại"
          value={user.SoDienThoai || "Chưa cập nhật"}
        />

        {/* Địa chỉ */}
        <InfoItem
          icon={<MapPin />}
          label="Địa chỉ"
          value={user.DiaChi || "Chưa cập nhật"}
        />

        {/* Vai trò */}
        <InfoItem
          icon={<ShieldCheck />}
          label="Vai trò"
          value={user.VaiTro?.Ten}
        />

        {/* Ngày tạo */}
        <InfoItem
          icon={<Calendar />}
          label="Ngày tạo tài khoản"
          value={new Date(user.createdAt).toLocaleDateString("vi-VN")}
        />
      </div>
    </div>
  );
}

function InfoItem({ icon, label, value }) {
  return (
    <div className="flex items-start gap-3 border rounded-xl p-4 bg-gray-50">
      <div className="text-blue-600">{icon}</div>
      <div>
        <p className="text-sm text-gray-500">{label}</p>
        <p className="font-semibold text-gray-800">{value}</p>
      </div>
    </div>
  );
}
