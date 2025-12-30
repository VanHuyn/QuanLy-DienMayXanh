import React, { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import Meta from "../../components/Meta";
import toast from "react-hot-toast";

import AccountList from "../../components/admin/AccountList";
import AccountActions from "../../components/admin/AccountActions";
import ManagerAccountForm from "../../components/manager/ManagerAccountForm";

import useAuth from "../../hooks/useAuth";
import { useRoles } from "../../context/RoleContext";
import { useStaffs } from "../../context/StaffContext";

export default function StaffManagement() {
  const { user } = useAuth();
  const { roles } = useRoles();
  const {
    staffs,
    loading,
    fetchByBranch,
    createStaff,
    updateStaff,
    deleteStaff,
  } = useStaffs();

  const chiNhanhId = user?.NhanVien?.ChiNhanhId;
  const chiNhanhTen = user?.NhanVien?.ChiNhanh?.Ten;

  const [selected, setSelected] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const emptyForm = {
    Id: "",
    HoTen: "",
    Email: "",
    MatKhau: "",
    SoDienThoai: "",
    DiaChi: "",
    VaiTroId: "",
    ChiNhanhId: chiNhanhId || "",
  };

  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    if (chiNhanhId) {
      fetchByBranch(chiNhanhId);
    }
  }, [chiNhanhId]);

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        ...form,
        ChiNhanhId: chiNhanhId,
      };

      if (isEdit) {
        await updateStaff(form.Id, payload);
        toast.success("Cập nhật nhân viên thành công");
      } else {
        await createStaff(payload);
        toast.success("Thêm nhân viên thành công");
      }

      setShowForm(false);
      setIsEdit(false);
      setForm(emptyForm);
      fetchByBranch(chiNhanhId);
    } catch {
      toast.error("Lỗi khi lưu nhân viên");
    }
  };

  const handleEdit = (acc) => {
    setForm({
      Id: acc.Id,
      HoTen: acc.HoTen,
      Email: acc.Email,
      SoDienThoai: acc.SoDienThoai || "",
      DiaChi: acc.DiaChi || "",
      VaiTroId: String(acc.VaiTroId),
      ChiNhanhId: chiNhanhId,
      MatKhau: "",
    });

    setIsEdit(true);
    setShowForm(true);
  };

  const handleAdd = () => {
    setForm({
      ...emptyForm,
      ChiNhanhId: chiNhanhId,
    });
    setIsEdit(false);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    try {
      await deleteStaff(id);
      toast.success("Đã xoá nhân viên");
      setSelected(null);
      fetchByBranch(chiNhanhId);
    } catch {
      toast.error("Không thể xoá nhân viên");
    }
  };


  const staffRoles = roles.filter((r) =>
    ["NhanVienBanHang", "NhanVienKhoTong", "NhanVienKhoChiNhanh"].includes(
      r.Ten
    )
  );

  return (
    <div className="p-6 bg-blue-50 min-h-screen">
      <Meta title="Quản lý nhân viên chi nhánh" />

      <h1 className="text-3xl font-bold text-blue-700 mb-6 text-center">
        Quản lý nhân viên – {chiNhanhTen}
      </h1>

      <div className="flex justify-end mb-4">
        <button
          onClick={handleAdd}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          <Plus size={18} />
          Thêm nhân viên
        </button>
      </div>

      {showForm && (
        <ManagerAccountForm
          form={form}
          roles={staffRoles}
          onChange={handleChange}
          onSubmit={handleSubmit}
          onCancel={() => setShowForm(false)}
          isEdit={isEdit}
          managerBranch={user?.NhanVien?.ChiNhanh}
        />
      )}

      <AccountList
        accounts={staffs}
        roles={roles}
        onEdit={handleEdit}
        onDelete={setSelected}
        loading={loading}
      />

      <AccountActions
        selected={selected}
        onConfirm={handleDelete}
        onCancel={() => setSelected(null)}
      />
    </div>
  );
}
