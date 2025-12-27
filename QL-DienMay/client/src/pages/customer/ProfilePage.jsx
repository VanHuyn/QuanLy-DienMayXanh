import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";

export default function ProfilePage() {
  const { user } = useContext(AuthContext);

  const initialForm = {
    HoTen: user?.HoTen || "",
    Email: user?.Email || "",
    SoDienThoai: user?.SoDienThoai || "",
    DiaChi: user?.DiaChi || "",
  };

  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState(initialForm);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    console.log("Save profile", form);
    setEditMode(false);
  };

  return (
    <div className="min-h-screen bg-linear-to-r from-blue-100 via-white to-blue-100 py-10 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-800">Thông tin cá nhân</h1>
          <p className="text-gray-600 mt-2">Quản lý thông tin tài khoản của bạn</p>
        </div>

        {/* Card */}
        <div className="bg-white shadow-2xl rounded-2xl p-8 flex flex-col md:flex-row gap-8 items-center">
          {/* Avatar */}
          <div className="flex flex-col items-center">
            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-blue-400 shadow-lg mb-4">
              <img
                src={user?.AnhDaiDien || "https://i.pravatar.cc/50"}
                alt="Avatar"
                className="w-full h-full object-cover"
              />
            </div>
            {editMode && (
              <button className="px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition">
                Thay đổi ảnh
              </button>
            )}
          </div>

          <div className="flex-1 w-full space-y-6">
            <div className="flex items-center gap-4">
              <FaUser className="text-blue-500 text-2xl shrink-0" />
              <div className="flex-1 flex flex-col">
                <label className="text-gray-500 font-medium">Họ và tên</label>
                {editMode ? (
                  <input
                    type="text"
                    name="HoTen"
                    value={form.HoTen}
                    onChange={handleChange}
                    className="mt-1 w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                ) : (
                  <p className="mt-1 text-gray-800 font-semibold">{form.HoTen}</p>
                )}
              </div>
            </div>
            <div className="flex items-center gap-4">
              <FaEnvelope className="text-blue-500 text-2xl shrink-0" />
              <div className="flex-1 flex flex-col">
                <label className="text-gray-500 font-medium">Email</label>
                {editMode ? (
                  <input
                    type="email"
                    name="Email"
                    value={form.Email}
                    onChange={handleChange}
                    className="mt-1 w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                ) : (
                  <p className="mt-1 text-gray-800">{form.Email}</p>
                )}
              </div>
            </div>

            {/* Số điện thoại */}
            <div className="flex items-center gap-4">
              <FaPhone className="text-blue-500 text-2xl shrink-0" />
              <div className="flex-1 flex flex-col">
                <label className="text-gray-500 font-medium">Số điện thoại</label>
                {editMode ? (
                  <input
                    type="text"
                    name="SoDienThoai"
                    value={form.SoDienThoai}
                    onChange={handleChange}
                    className="mt-1 w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                ) : (
                  <p className="mt-1 text-gray-800">{form.SoDienThoai}</p>
                )}
              </div>
            </div>

            {/* Địa chỉ */}
            <div className="flex items-center gap-4">
              <FaMapMarkerAlt className="text-blue-500 text-2xl shrink-0" />
              <div className="flex-1 flex flex-col">
                <label className="text-gray-500 font-medium">Địa chỉ</label>
                {editMode ? (
                  <textarea
                    name="DiaChi"
                    value={form.DiaChi}
                    onChange={handleChange}
                    rows={2}
                    className="mt-1 w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                ) : (
                  <p className="mt-1 text-gray-800">{form.DiaChi || "Chưa cập nhật"}</p>
                )}
              </div>
            </div>

            {/* Nút thao tác */}
            <div className="flex gap-4 justify-end mt-4">
              {editMode ? (
                <>
                  <button
                    onClick={handleSave}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                  >
                    Lưu
                  </button>
                  <button
                    onClick={() => {
                      setForm(initialForm);
                      setEditMode(false);
                    }}
                    className="px-6 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition"
                  >
                    Hủy
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setEditMode(true)}
                  className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                >
                  Chỉnh sửa
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
