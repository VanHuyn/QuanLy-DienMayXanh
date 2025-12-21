import { Plus, FilePlus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Meta from "../../components/Meta";
import { useSupplierImports } from "../../context/SupplierImportContext";

import SupplierImportForm from "../../components/admin/SupplierImportForm";
import SupplierImportList from "../../components/admin/SupplierImportList";
import { useState } from "react";

export default function SupplierImportManagement() {
  const { imports, createImport } = useSupplierImports();
  const navigate = useNavigate();

  const emptyForm = {
    NhaCungCapId: "",
    KhoTongId: "",
    ChiTietPhieuNhaps: [],
  };

  const [form, setForm] = useState(emptyForm);
  const [showForm, setShowForm] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
   
    const payload = {
      ...form,
      ChiTietPhieuNhaps: form.ChiTietPhieuNhaps || [],
    };

    if (!payload.ChiTietPhieuNhaps || payload.ChiTietPhieuNhaps.length === 0) {
      alert("Vui lòng thêm ít nhất 1 sản phẩm trước khi tạo phiếu nhập");
      return;
    }

    await createImport(payload);
    setForm(emptyForm);
    setShowForm(false);
  };

  return (
    <div className="p-6">
      <Meta title="Phiếu nhập NCC" />

      <div className="flex justify-end mb-4">
        <button
          onClick={() => setShowForm(true)}
          className="bg-green-700 text-white px-4 py-2 rounded"
        >
          <Plus /> Tạo phiếu nhập
        </button>
      </div>

      {showForm && (
        <SupplierImportForm
          form={form}
          setForm={setForm}
          onSubmit={handleSubmit}
          onCancel={() => setShowForm(false)}
        />
      )}

      <SupplierImportList
        imports={imports}
        onViewDetail={(id) => navigate(`/admin/supplier-imports/${id}`)}
      />
    </div>
  );
}
