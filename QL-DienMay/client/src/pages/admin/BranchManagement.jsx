import { useState } from "react";
import { Plus, Store } from "lucide-react";
import Meta from "../../components/Meta";
import { useBranches } from "../../context/BranchContext";

import BranchForm from "../../components/admin/BranchForm";
import BranchList from "../../components/admin/BranchList";
import BranchActions from "../../components/admin/BranchActions";

export default function BranchManagement() {
  const {
    branches,
    createBranch,
    updateBranch,
    deleteBranch,
    loading,
  } = useBranches();

  const emptyForm = {
    Id: "",
    Ten: "",
    Ma: "",
    DiaChi: "",
    SoDienThoai: "",
    Email: "",
  };

  const [form, setForm] = useState(emptyForm);
  const [isEdit, setIsEdit] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [selected, setSelected] = useState(null); // dùng cho xoá


  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isEdit) {
      await updateBranch(form.Id, form);
    } else {
      await createBranch(form);
    }

    setForm(emptyForm);
    setIsEdit(false);
    setShowForm(false);
  };

  const handleEdit = (item) => {
    setForm(item);
    setIsEdit(true);
    setShowForm(true);
  };

  const handleDeleteConfirm = async (id) => {
    await deleteBranch(id);
    setSelected(null);
  };

  // =====================
  // Render
  // =====================
  return (
    <div className="p-6 bg-linear-to-br from-blue-50 to-blue-100 min-h-screen">
      <Meta title="Quản lý chi nhánh" />

      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-4xl font-extrabold text-blue-600 flex justify-center gap-2 items-center">
          <Store size={36} /> Quản lý chi nhánh
        </h1>
        <p className="text-gray-600 mt-1">
          Quản lý danh sách chi nhánh trong hệ thống
        </p>
      </div>

      {/* Button thêm */}
      <div className="flex justify-end mb-4">
        <button
          onClick={() => {
            setForm(emptyForm);
            setIsEdit(false);
            setShowForm(true);
          }}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700"
        >
          <Plus size={18} />
          Thêm chi nhánh
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <BranchForm
          form={form}
          onChange={handleChange}
          onSubmit={handleSubmit}
          onCancel={() => setShowForm(false)}
          isEdit={isEdit}
        />
      )}

      {/* List */}
      <BranchList
        branches={branches}
        loading={loading}
        onEdit={handleEdit}
        onDelete={setSelected}
      />

      {/* Confirm delete */}
      <BranchActions
        selected={selected}
        onConfirm={handleDeleteConfirm}
        onCancel={() => setSelected(null)}
      />
    </div>
  );
}
