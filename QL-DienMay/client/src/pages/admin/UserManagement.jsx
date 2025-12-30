import React, { useState, useEffect } from "react";
import { useRoles } from "../../context/RoleContext";
import AccountList from "../../components/admin/AccountList";
import AccountForm from "../../components/admin/AccountForm";
import AccountActions from "../../components/admin/AccountActions";
import accountService from "../../services/userService";
import toast from "react-hot-toast";
import { Plus } from "lucide-react";
import Meta from "../../components/Meta";

export default function UserManagement() {
  const { roles } = useRoles();

  const [accounts, setAccounts] = useState([]);
  const [selected, setSelected] = useState(null);
  const [showForm, setShowForm] = useState(false); // ⬅ form ẩn/hiện

const emptyForm = {
  Id: "",
  HoTen: "",
  Email: "",
  MatKhau: "",
  SoDienThoai: "",
  DiaChi: "",
  VaiTroId: "",
  ChiNhanhId: "",
};


  const [form, setForm] = useState(emptyForm);
  const [isEdit, setIsEdit] = useState(false);

  const fetchAccounts = async () => {
    const data = await accountService.getAll();
    setAccounts(data);
  };

  useEffect(() => {
    fetchAccounts();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // SUBMIT FORM (TẠO + CẬP NHẬT)
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isEdit) {
        await accountService.update(form.Id, form);
        toast.success("Cập nhật thành công");
      } else {
        await accountService.create(form);
        toast.success("Tạo tài khoản thành công");
      }

      setForm(emptyForm);
      setIsEdit(false);
      setShowForm(false); // ⬅ đóng form sau khi xong
      fetchAccounts();
    } catch (e) {
      toast.error("Lỗi khi lưu tài khoản!");
    }
  };

  // BẤM SỬA
  const handleEdit = (account) => {
  setForm({
    Id: account.Id,
    HoTen: account.HoTen,
    Email: account.Email,
    SoDienThoai: account.SoDienThoai,
    DiaChi: account.DiaChi,
    VaiTroId: account.VaiTroId,
    ChiNhanhId: account.NhanVien?.ChiNhanhId || "",
    MatKhau: "",
  });

  setIsEdit(true);
  setShowForm(true);
};

  // BẤM THÊM MỚI
  const handleAdd = () => {
    setForm(emptyForm);
    setIsEdit(false);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    try {
      await accountService.delete(id);
      toast.success("Đã xoá tài khoản");
      setSelected(null);
      fetchAccounts();
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="p-6 bg-linear-to-br from-blue-50 to-blue-100">
      <Meta title={"Quản lý tài khoản"} description={"Quản lý tài khoản"} />
      <div className="w-full mx-auto mb-8 text-center">
        <h1 className="text-4xl font-extrabold text-blue-700 mb-3 tracking-wide drop-shadow-sm">
          Quản lý tài khoản
        </h1>
        <p className="text-gray-600 text-lg">
          Hệ thống quản lý và tài khoản người dùng.
        </p>
      </div>
      {/* BUTTON THÊM MỚI */}
      <div className="flex justify-end mb-4">
        <button
          onClick={handleAdd}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition"
        >
          <Plus size={18} />
          Thêm tài khoản
        </button>
      </div>

      {/* FORM — CHỈ HIỂN THỊ KHI showForm = true */}
      {showForm && (
        <AccountForm
          form={form}
          roles={roles}
          onChange={handleChange}
          onSubmit={handleSubmit}
          onCancel={() => setShowForm(false)}
          isEdit={isEdit}
        />
      )}

      {/* DANH SÁCH */}
      <AccountList
        accounts={accounts}
        roles={roles}
        onEdit={handleEdit}
        onDelete={setSelected}
      />

      {/* MODAL XOÁ */}
      <AccountActions
        selected={selected}
        onConfirm={handleDelete}
        onCancel={() => setSelected(null)}
      />
    </div>
  );
}
