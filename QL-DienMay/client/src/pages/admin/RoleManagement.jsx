import React, { useState } from "react";
import { useRoles } from "../../context/RoleContext";
import { Pencil, Trash2, Plus, AlertTriangle, Search } from "lucide-react";
import Meta from "../../components/Meta";

export default function RoleManagement() {
  const { roles, createRole, updateRole, deleteRole } = useRoles();

  const [showModal, setShowModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [roleToDelete, setRoleToDelete] = useState(null);

  const [editing, setEditing] = useState(null);
  const [search, setSearch] = useState("");

  const ROLE_ENUM = [
    "Admin",
    "QuanLy",
    "NhanVienBanHang",
    "NhanVienKhoTong",
    "NhanVienKhoChiNhanh",
    "KhachHang",
    "KhachVangLai",
  ];

  const [form, setForm] = useState({ Ten: "", MoTa: "" });

  const openAddModal = () => {
    setEditing(null);
    setForm({ Ten: "", MoTa: "" });
    setShowModal(true);
  };

  const openEditModal = (role) => {
    setEditing(role);
    setForm({ Ten: role.Ten, MoTa: role.MoTa });
    setShowModal(true);
  };

  const handleSubmit = async () => {
    if (editing) {
      await updateRole(editing.Id, form);
    } else {
      await createRole(form);
    }
    setShowModal(false);
  };

  const confirmDelete = (role) => {
    setRoleToDelete(role);
    setShowDeleteConfirm(true);
  };

  const handleDelete = async () => {
    await deleteRole(roleToDelete.Id);
    setShowDeleteConfirm(false);
  };

  // 🔍 Tìm kiếm theo tên + mô tả
  const filteredRoles = roles.filter((r) => {
    const text = search.toLowerCase();
    return (
      r.Ten.toLowerCase().includes(text) ||
      (r.MoTa && r.MoTa.toLowerCase().includes(text))
    );
  });

  return (
    <div className="p-10 min-h-screen bg-linear-to-br from-blue-50 to-blue-100">
      <Meta title={"Quản lý vai trò"} description={"Quản lý vai trò"} />
      <div className="w-full mx-auto mb-8 text-center">
        <h1 className="text-4xl font-extrabold text-blue-700 mb-3 tracking-wide drop-shadow-sm">
          Quản lý vai trò
        </h1>
        <p className="text-gray-600 text-lg">
          Hệ thống quản lý và phân quyền người dùng.
        </p>
      </div>
      <div className="w-full mx-auto bg-white p-8 rounded-3xl shadow-2xl border border-gray-200">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-3 bg-gray-50 px-4 py-3 rounded-2xl shadow-inner border border-blue-700 w-1/3 hover:shadow-md transition">
            <Search size={20} className="text-blue-700" />
            <input
              type="text"
              placeholder="Tìm kiếm theo tên hoặc mô tả..."
              className="bg-transparent outline-none w-full text-gray-700"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <button
            onClick={openAddModal}
            className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-2xl shadow-lg hover:bg-blue-700 hover:shadow-xl transition-all active:scale-95"
          >
            <Plus size={20} /> Thêm vai trò
          </button>
        </div>

        {/* Table */}
        <div className="overflow-hidden rounded-2xl shadow-lg border border-gray-200">
          <table className="w-full text-left">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="px-5 py-4">#</th>
                <th className="px-5 py-4">Tên Vai Trò</th>
                <th className="px-5 py-4">Mô Tả</th>
                <th className="px-5 py-4 text-center">Hành động</th>
              </tr>
            </thead>

            <tbody>
              {filteredRoles.length === 0 ? (
                <tr>
                  <td
                    colSpan="4"
                    className="text-center py-8 text-gray-500 italic text-lg"
                  >
                    Không tìm thấy vai trò phù hợp...
                  </td>
                </tr>
              ) : (
                filteredRoles.map((role, index) => (
                  <tr
                    key={role.Id}
                    className="border-b even:bg-gray-50 hover:bg-blue-50/70 transition-all"
                  >
                    <td className="px-5 py-4 font-semibold text-gray-800">
                      {index + 1}
                    </td>

                    <td className="px-5 py-4 text-blue-700 font-semibold">
                      {role.Ten}
                    </td>

                    <td className="px-5 py-4 text-gray-600">
                      {role.MoTa || "—"}
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex justify-center gap-3">
                        <button
                          onClick={() => openEditModal(role)}
                          className="p-2 bg-yellow-400 text-white rounded-full shadow hover:bg-yellow-500 active:scale-90 transition"
                        >
                          <Pencil size={18} />
                        </button>

                        <button
                          onClick={() => confirmDelete(role)}
                          className="p-2 bg-red-500 text-white rounded-full shadow hover:bg-red-600 active:scale-90 transition"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Thêm/Sửa */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center backdrop-blur-sm animate-fadeIn">
          <div className="bg-white w-[30%] p-8 rounded-3xl shadow-2xl animate-popup border border-gray-200">
            <h3 className="text-3xl font-bold text-blue-700 mb-6 text-center">
              {editing ? "Cập nhật vai trò" : "Thêm vai trò mới"}
            </h3>

            {/* Select */}
            <label className="font-semibold text-gray-700">Tên Vai Trò</label>
            <select
              className="w-full mt-2 p-3 border rounded-xl bg-gray-50 focus:ring-2 focus:ring-blue-400 outline-none transition mb-4"
              value={form.Ten}
              onChange={(e) => setForm({ ...form, Ten: e.target.value })}
            >
              <option value="">-- Chọn vai trò --</option>
              {ROLE_ENUM.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>

            {/* Description */}
            <label className="font-semibold text-gray-700">Mô tả</label>
            <textarea
              className="w-full mt-2 p-3 border rounded-xl bg-gray-50 focus:ring-2 focus:ring-blue-400 outline-none transition"
              rows="3"
              placeholder="Nhập mô tả vai trò..."
              value={form.MoTa}
              onChange={(e) => setForm({ ...form, MoTa: e.target.value })}
            ></textarea>

            {/* Buttons */}
            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-400 text-white rounded-xl hover:bg-gray-500 active:scale-95 transition"
              >
                Hủy
              </button>
              <button
                onClick={handleSubmit}
                className="px-5 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 active:scale-95 transition"
              >
                Lưu
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Xoá */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center animate-fadeIn">
          <div className="bg-white w-[400px] p-7 rounded-2xl shadow-2xl animate-popup">
            <div className="flex items-center gap-3 mb-4">
              <AlertTriangle className="text-red-500" size={32} />
              <h3 className="text-2xl font-bold text-red-600">Xác nhận xoá</h3>
            </div>

            <p className="text-gray-700 mb-6 leading-relaxed">
              Bạn có chắc chắn muốn xoá vai trò
              <span className="font-semibold text-red-600">
                "{roleToDelete?.Ten}"{" "}
              </span>
              không?
            </p>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="px-4 py-2 text-gray-700 bg-gray-200 rounded-xl hover:bg-gray-300 active:scale-95 transition"
              >
                Huỷ
              </button>

              <button
                onClick={handleDelete}
                className="px-5 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700 active:scale-95 transition"
              >
                Xoá
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
