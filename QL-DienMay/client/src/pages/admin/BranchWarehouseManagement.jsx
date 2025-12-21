import { useState } from "react";
import { Plus, Warehouse } from "lucide-react";
import Meta from "../../components/Meta";
import { useBranchWarehouses } from "../../context/BranchWarehouseContext";

import BranchWarehouseForm from "../../components/admin/BranchWarehouseForm";
import BranchWarehouseList from "../../components/admin/BranchWarehouseList";
import BranchWarehouseActions from "../../components/admin/BranchWarehouseActions";

export default function BranchWarehouseManagement() {
  const { warehouses, createWarehouse, updateWarehouse, deleteWarehouse } =
    useBranchWarehouses();

  const emptyForm = { Id: "", ChiNhanhId: "", Ten: "", DiaChi: "" };

  const [form, setForm] = useState(emptyForm);
  const [isEdit, setIsEdit] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [selected, setSelected] = useState(null);

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

  const handleDeleteConfirm = async (id) => {
    await deleteWarehouse(id);
    setSelected(null);
  };

  return (
    <div className="p-6 bg-linear-to-br from-blue-50 to-blue-100">
      <Meta title="Branch Warehouses" />

      <div className="text-center mb-6">
        <h1 className="text-4xl font-extrabold text-blue-600 flex justify-center gap-2">
          <Warehouse /> Kho chi nhánh
        </h1>
        <p className="text-gray-600">Manage branch warehouses in the system</p>
      </div>

      <div className="flex justify-end mb-4">
        <button
          onClick={() => {
            setForm(emptyForm);
            setIsEdit(false);
            setShowForm(true);
          }}
          className="flex items-center gap-2 bg-blue-700 text-white px-4 py-2 rounded-lg"
        >
          <Plus size={18} /> Thêm kho chi nhánh
        </button>
      </div>

      {showForm && (
        <BranchWarehouseForm
          form={form}
          onChange={handleChange}
          onSubmit={handleSubmit}
          onCancel={() => setShowForm(false)}
          isEdit={isEdit}
        />
      )}

      <BranchWarehouseList
        branchWarehouses={warehouses}
        onEdit={handleEdit}
        onDelete={setSelected}
      />

      <BranchWarehouseActions
        selected={selected}
        onConfirm={handleDeleteConfirm}
        onCancel={() => setSelected(null)}
      />
    </div>
  );
}
