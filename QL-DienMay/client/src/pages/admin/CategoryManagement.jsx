import { useState } from "react";
import { Plus } from "lucide-react";
import Meta from "../../components/Meta";

import { useCategories } from "../../context/CategoryContext";
import CategoryForm from "../../components/admin/CategoryForm";
import CategoryList from "../../components/admin/CategoryList";
import CategoryActions from "../../components/admin/CategoryActions";

export default function CategoryManagement() {
  const { categories, createCategory, updateCategory, deleteCategory } =
    useCategories();

  const emptyForm = { Id: "", Ten: "", MoTa: "" };

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
      await updateCategory(form.Id, form);
    } else {
      await createCategory(form);
    }

    setForm(emptyForm);
    setIsEdit(false);
    setShowForm(false);
  };

  const handleEdit = (cat) => {
    setForm(cat);
    setIsEdit(true);
    setShowForm(true);
  };

  const handleAdd = () => {
    setForm(emptyForm);
    setIsEdit(false);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    await deleteCategory(id);
    setSelected(null);
  };

  return (
    <div className="p-6 bg-linear-to-br from-blue-50 to-blue-100">
      <Meta title="Quản lý danh mục" />

      <div className="text-center mb-6">
        <h1 className="text-4xl font-extrabold text-blue-700">
          Quản lý danh mục
        </h1>
        <p className="text-gray-600">
          Quản lý danh mục sản phẩm trong hệ thống
        </p>
      </div>

      <div className="flex justify-end mb-4">
        <button
          onClick={handleAdd}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg shadow"
        >
          <Plus size={18} />
          Thêm danh mục
        </button>
      </div>

      {showForm && (
        <CategoryForm
          form={form}
          onChange={handleChange}
          onSubmit={handleSubmit}
          onCancel={() => setShowForm(false)}
          isEdit={isEdit}
        />
      )}

      <CategoryList
        categories={categories}
        onEdit={handleEdit}
        onDelete={setSelected}
      />

      <CategoryActions
        selected={selected}
        onConfirm={handleDelete}
        onCancel={() => setSelected(null)}
      />
    </div>
  );
}
