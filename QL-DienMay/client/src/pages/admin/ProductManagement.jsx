import { useState } from "react";
import { Plus } from "lucide-react";
import Meta from "../../components/Meta";
import { useProducts } from "../../context/ProductContext";
import ProductForm from "../../components/admin/ProductForm";
import ProductList from "../../components/admin/ProductList";
import ProductActions from "../../components/admin/ProductActions";

export default function ProductManagement() {
  const {
    products,
    createProduct,
    updateProduct,
    deleteProduct,
    actionLoading,
  } = useProducts();
  const mapProductToForm = (p) => ({
    Id: p.Id,
    Ten: p.Ten || "",
    SKU: p.SKU || "",
    Gia: p.Gia || "",
    GiaKhuyenMai: p.GiaKhuyenMai || "",
    ThuongHieu: p.ThuongHieu || "",
    XuatXu: p.XuatXu || "",
    TrongLuong: p.TrongLuong || "",
    KichThuoc: p.KichThuoc || "",
    DanhMucId: p.DanhMucId || "",
    TrangThai: p.TrangThai || "DangBan",
    MoTa: p.MoTa || "",
  });

  const emptyForm = {
    Ten: "",
    SKU: "",
    Gia: "",
    GiaKhuyenMai: "",
    ThuongHieu: "",
    XuatXu: "",
    TrongLuong: "",
    KichThuoc: "",
    DanhMucId: "",
    TrangThai: "DangBan",
    MoTa: "",
  };

  const [form, setForm] = useState(emptyForm);
  const [isEdit, setIsEdit] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [selected, setSelected] = useState(null);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e, images) => {
    e.preventDefault();

    const formData = new FormData();

    Object.entries(form).forEach(([key, value]) => {
      if (value !== null && value !== undefined && typeof value !== "object") {
        formData.append(key, value);
      }
    });

    if (images.length > 0) {
      images.forEach((img) => formData.append("images", img));
    }

    if (isEdit) {
      await updateProduct(form.Id, formData);
    } else {
      await createProduct(formData);
    }

    setForm(emptyForm);
    setIsEdit(false);
    setShowForm(false);
  };

  return (
    <div className="p-6 bg-linear-to-br from-blue-50 to-blue-100 min-h-screen">
      <Meta title="Quản lý sản phẩm" />

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-blue-700">Quản lý sản phẩm</h1>
        <button
          onClick={() => {
            setForm(emptyForm);
            setIsEdit(false);
            setShowForm(true);
          }}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg shadow"
        >
          <Plus size={18} /> Thêm sản phẩm
        </button>
      </div>

      {showForm && (
        <ProductForm
          form={form}
          onChange={handleChange}
          onSubmit={handleSubmit}
          onCancel={() => setShowForm(false)}
          loading={actionLoading}
          isEdit={isEdit}
        />
      )}

      <ProductList
        products={products}
        onEdit={(p) => {
          setForm(mapProductToForm(p));
          setIsEdit(true);
          setShowForm(true);
        }}
        onDelete={setSelected}
      />

      <ProductActions
        selected={selected}
        onConfirm={async (id) => {
          await deleteProduct(id);
          setSelected(null);
        }}
        onCancel={() => setSelected(null)}
      />
    </div>
  );
}
