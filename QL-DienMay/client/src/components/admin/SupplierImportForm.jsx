import { useState } from "react";
import { useSuppliers } from "../../context/SupplierContext";
import { useWarehouses } from "../../context/WarehouseContext";
import { useProductVariants } from "../../context/ProductVariantContext";

export default function SupplierImportForm({
  form,
  setForm,
  onSubmit,
  onCancel,
}) {
  const { suppliers } = useSuppliers();
  const { warehouses } = useWarehouses();
  const { variants } = useProductVariants();

  const [bulkInput, setBulkInput] = useState("");
  const [mode, setMode] = useState("manual"); // manual | bulk

  /* =========================
     THÊM SẢN PHẨM THỦ CÔNG
  ========================= */
  const handleSelectProduct = (variantId) => {
    if (!variantId) return;

    const id = Number(variantId);
    const variant = variants.find((v) => v.Id === id);
    if (!variant) return;

    const exists = form.ChiTietPhieuNhaps.some(
      (p) => p.BienTheSanPhamId === id
    );
    if (exists) return;

    setForm((prev) => ({
      ...prev,
      ChiTietPhieuNhaps: [
        ...prev.ChiTietPhieuNhaps,
        {
          BienTheSanPhamId: id,
          SoLuong: 1,
          DonGia: Number(variant.Gia) || 0,
        },
      ],
    }));
  };

  /* =========================
     NHẬP MẢNG SẢN PHẨM
  ========================= */
  const handleApplyBulkInput = () => {
    try {
      const parsed = JSON.parse(bulkInput);

      if (!Array.isArray(parsed)) {
        alert("Dữ liệu phải là một mảng");
        return;
      }

      const validated = parsed.map((item) => {
        if (
          !item.BienTheSanPhamId ||
          !item.SoLuong ||
          item.DonGia === undefined
        ) {
          throw new Error("Thiếu dữ liệu trong mảng");
        }

        return {
          BienTheSanPhamId: Number(item.BienTheSanPhamId),
          SoLuong: Number(item.SoLuong),
          DonGia: Number(item.DonGia),
        };
      });

      setForm((prev) => ({
        ...prev,
        ChiTietPhieuNhaps: validated,
      }));

      alert("Đã áp dụng danh sách sản phẩm");
    } catch (err) {
      alert("Dữ liệu không hợp lệ");
    }
  };

  /* =========================
     UPDATE / DELETE
  ========================= */
  const updateProduct = (index, field, value) => {
    setForm((prev) => {
      const list = [...prev.ChiTietPhieuNhaps];
      list[index] = { ...list[index], [field]: value };
      return { ...prev, ChiTietPhieuNhaps: list };
    });
  };

  const removeProduct = (index) => {
    setForm((prev) => ({
      ...prev,
      ChiTietPhieuNhaps: prev.ChiTietPhieuNhaps.filter((_, i) => i !== index),
    }));
  };

  const total = form.ChiTietPhieuNhaps.reduce(
    (sum, p) => sum + p.SoLuong * p.DonGia,
    0
  );

  return (
    <form
      onSubmit={onSubmit}
      className="bg-white p-6 rounded-xl shadow space-y-6"
    >
      {/* MODE SWITCH */}
      <div className="flex gap-4">
        <button
          type="button"
          onClick={() => setMode("manual")}
          className={`px-4 py-2 rounded ${
            mode === "manual" ? "bg-blue-600 text-white" : "border"
          }`}
        >
          Nhập thủ công
        </button>
        <button
          type="button"
          onClick={() => setMode("bulk")}
          className={`px-4 py-2 rounded ${
            mode === "bulk" ? "bg-blue-600 text-white" : "border"
          }`}
        >
          Nhập mảng
        </button>
      </div>

      {/* NHÀ CUNG CẤP */}
      <select
        value={form.NhaCungCapId}
        onChange={(e) =>
          setForm({ ...form, NhaCungCapId: e.target.value })
        }
        className="w-full border p-2 rounded"
        required
      >
        <option value="">-- Chọn nhà cung cấp --</option>
        {suppliers.map((ncc) => (
          <option key={ncc.Id} value={ncc.Id}>
            {ncc.Ten}
          </option>
        ))}
      </select>

      {/* KHO TỔNG */}
      <select
        value={form.KhoTongId}
        onChange={(e) =>
          setForm({ ...form, KhoTongId: e.target.value })
        }
        className="w-full border p-2 rounded"
        required
      >
        <option value="">-- Chọn kho tổng --</option>
        {warehouses.map((kho) => (
          <option key={kho.Id} value={kho.Id}>
            {kho.Ten}
          </option>
        ))}
      </select>

      {/* MODE BULK */}
      {mode === "bulk" && (
        <div>
          <textarea
            rows={6}
            value={bulkInput}
            onChange={(e) => setBulkInput(e.target.value)}
            placeholder={`Ví dụ:
[
  { "BienTheSanPhamId": 1, "SoLuong": 10, "DonGia": 900000 }
]`}
            className="w-full border p-3 font-mono text-sm"
          />
          <button
            type="button"
            onClick={handleApplyBulkInput}
            className="mt-2 bg-green-600 text-white px-4 py-2 rounded"
          >
            Áp dụng danh sách
          </button>
        </div>
      )}

      {/* MODE MANUAL */}
      {mode === "manual" && (
        <select
          onChange={(e) => handleSelectProduct(e.target.value)}
          className="w-full border p-2 rounded"
        >
          <option value="">-- Chọn sản phẩm --</option>
          {variants.map((v) => (
            <option key={v.Id} value={v.Id}>
              {v.SanPham?.Ten} – {v.Ten}
            </option>
          ))}
        </select>
      )}

      {/* TABLE */}
      {form.ChiTietPhieuNhaps.length > 0 && (
        <table className="w-full border text-sm">
          <tbody>
            {form.ChiTietPhieuNhaps.map((p, i) => (
              <tr key={i}>
                <td className="border p-2">{p.BienTheSanPhamId}</td>
                <td className="border p-2">
                  <input
                    type="number"
                    value={p.SoLuong}
                    onChange={(e) =>
                      updateProduct(i, "SoLuong", Number(e.target.value))
                    }
                    className="w-full border"
                  />
                </td>
                <td className="border p-2">
                  <input
                    type="number"
                    value={p.DonGia}
                    onChange={(e) =>
                      updateProduct(i, "DonGia", Number(e.target.value))
                    }
                    className="w-full border"
                  />
                </td>
                <td className="border p-2">
                  {(p.SoLuong * p.DonGia).toLocaleString()} ₫
                </td>
                <td className="border p-2">
                  <button
                    type="button"
                    onClick={() => removeProduct(i)}
                    className="text-red-600"
                  >
                    Xoá
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <div className="text-right font-semibold">
        Tổng tiền: {total.toLocaleString()} ₫
      </div>

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={!form.ChiTietPhieuNhaps.length}
          className="bg-green-600 text-white px-6 py-2 rounded-lg"
        >
          Tạo phiếu nhập
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="px-6 py-2 border rounded-lg"
        >
          Huỷ
        </button>
      </div>
    </form>
  );
}
