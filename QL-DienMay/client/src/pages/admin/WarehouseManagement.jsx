import { useState } from "react";
import { Plus, Warehouse } from "lucide-react";
import Meta from "../../components/Meta";
import { useWarehouses } from "../../context/WarehouseContext";

import WarehouseForm from "../../components/admin/WarehouseForm";
import WarehouseList from "../../components/admin/WarehouseList";
import WarehouseActions from "../../components/admin/WarehouseActions";

export default function WarehouseManagement() {
  const { warehouses, createWarehouse, updateWarehouse, deleteWarehouse } =
    useWarehouses();

  const emptyForm = { Id: "", Ten: "", DiaChi: "" };

  const [form, setForm] = useState(emptyForm);
  const [isEdit, setIsEdit] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [selected, setSelected] = useState(null);
  const handleDeleteConfirm = async (id) => {
  await deleteWarehouse(id);
  setSelected(null); 
};

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isEdit) await updateWarehouse(form.Id, form);
    else await createWarehouse(form);

    setForm(emptyForm);
    setIsEdit(false);
    setShowForm(false);
  };

  const handleEdit = (item) => {
    setForm(item);
    setIsEdit(true);
    setShowForm(true);
  };

  return (
    <div className="p-6 bg-linear-to-br from-blue-50 to-blue-100">
      <Meta title="Quản lý kho tổng" />

      <div className="text-center mb-6">
        <h1 className="text-4xl font-extrabold text-blue-700 flex justify-center gap-2">
          <Warehouse /> Quản lý kho tổng
        </h1>
        <p className="text-gray-600">
          Quản lý danh sách kho tổng trong hệ thống
        </p>
      </div>

      <div className="flex justify-end mb-4">
        <button
          onClick={() => {
            setForm(emptyForm);
            setIsEdit(false);
            setShowForm(true);
          }}
          className="flex items-center gap-2 bg-blue-700 text-white px-4 py-2 rounded-lg shadow"
        >
          <Plus size={18} />
          Thêm kho tổng
        </button>
      </div>

      {showForm && (
        <WarehouseForm
          form={form}
          onChange={handleChange}
          onSubmit={handleSubmit}
          onCancel={() => setShowForm(false)}
          isEdit={isEdit}
        />
      )}

      <WarehouseList
        warehouses={warehouses}
        onEdit={handleEdit}
        onDelete={setSelected}
      />

      <WarehouseActions
        selected={selected}
        onConfirm={handleDeleteConfirm}
        onCancel={() => setSelected(null)}
      />
    </div>
  );
}
