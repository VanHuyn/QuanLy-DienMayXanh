import { useState } from "react";
import { useInventory } from "../../context/InventoryContext";
import { useBranchWarehouses } from "../../context/BranchWarehouseContext";

export default function ExportToBranchPage() {
  const { khoTongInventories, exportToBranch } = useInventory();
  const { warehouses } = useBranchWarehouses();

  const defaultForm = {
    bienTheId: "",
    khoTongId: "",
    khoChiNhanhId: "",
    soLuong: 1,
  };
  
  const [form, setForm] = useState(defaultForm);
  const selectedTonKho = khoTongInventories.find(
    (i) => i.BienTheSanPhamId == form.bienTheId
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
    await exportToBranch(form); 
    setForm(defaultForm); // 
  } catch (err) {
    console.error(err);
  }
  };

  return (
    <div className="bg-white p-4 rounded shadow px-20">
      <h2 className="text-xl font-semibold mb-4">
        Xuất kho tổng cho chi nhánh
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* SẢN PHẨM KHO TỔNG */}
        <select
          className="w-full border p-2 rounded"
          value={form.bienTheId}
          onChange={(e) => {
            const bienTheId = e.target.value;
            const tonKho = khoTongInventories.find(
              (i) => i.BienTheSanPhamId == bienTheId
            );

            setForm({
              ...form,
              bienTheId,
              khoTongId: tonKho?.KhoTongId || "",
            });
          }}
        >
          <option value="">-- Chọn sản phẩm trong kho tổng --</option>
          {khoTongInventories.map((i) => (
            <option key={i.Id} value={i.BienTheSanPhamId}>
              {i.BienThe?.SanPham?.Ten} | Tồn: {i.SoLuong}
            </option>
          ))}
        </select>

        {selectedTonKho && (
          <div className="text-sm text-gray-600">
            Tồn kho tổng:{" "}
            <b className="text-blue-600">{selectedTonKho.SoLuong}</b>
          </div>
        )}

        {/* KHO CHI NHÁNH */}
        <select
          className="w-full border p-2 rounded"
          value={form.khoChiNhanhId}
          onChange={(e) => setForm({ ...form, khoChiNhanhId: e.target.value })}
        >
          <option value="">-- Chọn kho chi nhánh --</option>
          {warehouses.map((w) => (
            <option key={w.Id} value={w.Id}>
              {w.Ten} ({w.ChiNhanh?.Ten})
            </option>
          ))}
        </select>

        {/* SỐ LƯỢNG */}
        <input
          type="number"
          min={1}
          max={selectedTonKho?.SoLuong || 1}
          className="w-full border p-2 rounded"
          value={form.soLuong}
          onChange={(e) =>
            setForm({ ...form, soLuong: Number(e.target.value) })
          }
        />

        <button className="bg-blue-600 text-white px-4 py-2 rounded">
          Xuất kho
        </button>
      </form>
    </div>
  );
}
