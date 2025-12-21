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
  console.log(form)
  // Chọn sản phẩm → thêm ngay 1 dòng
const handleSelectProduct = (variantId) => {
  if (!variantId) return;

  const id = Number(variantId);
  const v = variants.find((x) => x.Id === id);
  if (!v) return;

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
        TenSanPham: v.SanPham?.Ten || "",
        TenBienThe: v.Ten || "",
        SoLuong: 1,
        DonGia: Number(v.Gia) || 0,
      },
    ],
  }));
};

  // Update số lượng / giá
  const updateProduct = (index, field, value) => {
    setForm((prev) => {
      const list = [...prev.ChiTietPhieuNhaps];
      list[index] = { ...list[index], [field]: value };
      return { ...prev, ChiTietPhieuNhaps: list };
    });
  };

  // Xóa sản phẩm
  const removeProduct = (index) => {
    setForm((prev) => ({
      ...prev,
      ChiTietPhieuNhaps: prev.ChiTietPhieuNhaps.filter((_, i) => i !== index),
    }));
  };

  // Tổng tiền
  const total = form.ChiTietPhieuNhaps.reduce(
    (sum, p) => sum + p.SoLuong * p.DonGia,
    0
  );

  return (
    <form
      onSubmit={onSubmit}
      className="bg-white p-6 rounded-xl shadow space-y-6"
    >
      {/* Nhà cung cấp */}
      <div>
        <label className="font-medium block mb-1">Nhà cung cấp</label>
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
      </div>

      {/* Kho tổng */}
      <div>
        <label className="font-medium block mb-1">Kho tổng</label>
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
              {kho.Ten} – {kho.DiaChi}
            </option>
          ))}
        </select>
      </div>

      {/* Chọn sản phẩm */}
      <div>
        <label className="font-medium block mb-1">Thêm sản phẩm</label>
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
      </div>

      {/* Bảng sản phẩm */}
      {form.ChiTietPhieuNhaps.length > 0 && (
        <table className="w-full border text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-2 text-left">Sản phẩm</th>
              <th className="border p-2 w-24">SL</th>
              <th className="border p-2 w-32">Đơn giá</th>
              <th className="border p-2 w-32">Thành tiền</th>
              <th className="border p-2 w-20"></th>
            </tr>
          </thead>
          <tbody>
            {form.ChiTietPhieuNhaps.map((p, i) => {
              const v = variants.find(
                (x) => x.Id === p.BienTheSanPhamId
              );
              return (
                <tr key={i}>
                  <td className="border p-2">
                    {v?.SanPham?.Ten} – {v?.Ten}
                  </td>
                  <td className="border p-2">
                    <input
                      type="number"
                      min={1}
                      value={p.SoLuong}
                      onChange={(e) =>
                        updateProduct(i, "SoLuong", Number(e.target.value))
                      }
                      className="w-full border p-1"
                    />
                  </td>
                  <td className="border p-2">
                    <input
                      type="number"
                      min={0}
                      value={p.DonGia}
                      onChange={(e) =>
                        updateProduct(i, "DonGia", Number(e.target.value))
                      }
                      className="w-full border p-1"
                    />
                  </td>
                  <td className="border p-2 text-right">
                    {(p.SoLuong * p.DonGia).toLocaleString()} ₫
                  </td>
                  <td className="border p-2 text-center">
                    <button
                      type="button"
                      onClick={() => removeProduct(i)}
                      className="text-red-600"
                    >
                      Xoá
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}

      {/* Tổng tiền */}
      <div className="text-right font-semibold">
        Tổng tiền: {total.toLocaleString()} ₫
      </div>

      {/* Actions */}
      <div className="flex gap-3">
        <button
          type="submit"
          disabled={!form.ChiTietPhieuNhaps.length}
          className="bg-green-600 disabled:opacity-50 text-white px-6 py-2 rounded-lg"
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
