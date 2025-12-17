import { useState } from "react";
import { Plus } from "lucide-react";
import Meta from "../../components/Meta";

import { useSuppliers } from "../../context/SupplierContext";
import SupplierForm from "../../components/admin/SupplierForm";
import SupplierList from "../../components/admin/SupplierList";
import SupplierActions from "../../components/admin/SupplierActions";

export default function SupplierManagement() {
  const {
    suppliers,
    createSupplier,
    updateSupplier,
    deleteSupplier,
  } = useSuppliers();

  const emptyForm = {
    Id: "",
    Ten: "",
    DiaChi: "",
    SoDienThoai: "",
    Email: "",
  };

  const [form, setForm] = useState(emptyForm);
  const [isEdit, setIsEdit] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [selected, setSelected] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isEdit) {
      await updateSupplier(form.Id, form);
    } else {
      await createSupplier(form);
    }

    setForm(emptyForm);
    setIsEdit(false);
    setShowForm(false);
  };

  const handleEdit = (s) => {
    setForm(s);
    setIsEdit(true);
    setShowForm(true);
  };

  const handleAdd = () => {
    setForm(emptyForm);
    setIsEdit(false);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    await deleteSupplier(id);
    setSelected(null);
  };

  return (
    <div className="p-6 bg-linear-to-br from-blue-50 to-blue-100">
      <Meta title="Quản lý nhà cung cấp" />

      <div className="text-center mb-6">
        <h1 className="text-4xl font-extrabold text-blue-700">
          Quản lý nhà cung cấp
        </h1>
        <p className="text-gray-600">
          Quản lý thông tin nhà cung cấp
        </p>
      </div>

      <div className="flex justify-end mb-4">
        <button
          onClick={handleAdd}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg shadow"
        >
          <Plus size={18} />
          Thêm nhà cung cấp
        </button>
      </div>

      {showForm && (
        <SupplierForm
          form={form}
          onChange={handleChange}
          onSubmit={handleSubmit}
          onCancel={() => setShowForm(false)}
          isEdit={isEdit}
        />
      )}

      <SupplierList
        suppliers={suppliers}
        onEdit={handleEdit}
        onDelete={setSelected}
      />

      <SupplierActions
        selected={selected}
        onConfirm={handleDelete}
        onCancel={() => setSelected(null)}
      />
    </div>
  );
}
