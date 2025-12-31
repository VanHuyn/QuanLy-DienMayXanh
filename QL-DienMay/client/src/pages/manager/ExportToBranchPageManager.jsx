import { useEffect, useState } from "react";
import { useInventory } from "../../context/InventoryContext";
import useAuth from "../../hooks/useAuth";

export default function ExportToBranchManagerPage() {
  const { khoTongInventories, exportToBranch, fetchInventories } = useInventory();
  const { user } = useAuth();

  const khoChiNhanhId = user?.ChiNhanh?.KhoChiNhanh?.Id || "";

  const [form, setForm] = useState({
    bienTheId: "",
    khoTongId: "",
    khoChiNhanhId: khoChiNhanhId,
    soLuong: 1,
  });

  // Khi user thay đổi hoặc kho tổng thay đổi, cập nhật form mặc định
  useEffect(() => {
    setForm((prev) => ({
      ...prev,
      khoChiNhanhId,
      khoTongId: khoTongInventories[0]?.KhoTongId || "",
    }));
  }, [khoChiNhanhId, khoTongInventories]);

  // === Sản phẩm đang chọn ===
  const selectedTonKho = khoTongInventories.find(
    (i) => i.BienTheSanPhamId == form.bienTheId
  );

  // === Submit form ===
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.bienTheId || !form.soLuong) {
      return alert("Vui lòng chọn sản phẩm và số lượng");
    }

    try {
      await exportToBranch(form);
      // Reset form sau submit
      setForm((prev) => ({
        bienTheId: "",
        khoTongId: khoTongInventories[0]?.KhoTongId || "",
        khoChiNhanhId: khoChiNhanhId,
        soLuong: 1,
      }));
      // Cập nhật lại kho tổng
      fetchInventories();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="bg-white p-6 rounded shadow max-w-3xl mx-auto">
      <h2 className="text-xl font-semibold mb-4">
        Yêu cầu nhập hàng từ kho tổng
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* ===== SẢN PHẨM KHO TỔNG ===== */}
        {!khoTongInventories.length ? (
          <div>Đang tải sản phẩm...</div>
        ) : (
          <select
            className="w-full border p-2 rounded"
            value={form.bienTheId}
            onChange={(e) => {
              const bienTheId = e.target.value;
              const tonKho = khoTongInventories.find(
                (i) => i.BienTheSanPhamId == bienTheId
              );
              setForm((prev) => ({
                ...prev,
                bienTheId,
                khoTongId: tonKho?.KhoTongId || "",
              }));
            }}
          >
            <option value="">-- Chọn sản phẩm trong kho tổng --</option>
            {khoTongInventories.map((i) => (
              <option key={i.Id} value={i.BienTheSanPhamId}>
                {i.BienThe?.SanPham?.Ten} | Tồn: {i.SoLuong}
              </option>
            ))}
          </select>
        )}

        {selectedTonKho && (
          <div className="text-sm text-gray-600">
            Tồn kho tổng: <b className="text-blue-600">{selectedTonKho.SoLuong}</b>
          </div>
        )}

        {/* ===== KHO CHI NHÁNH (READ ONLY) ===== */}
        <div className="border p-2 rounded bg-gray-50 text-sm">
          <b>Kho chi nhánh:</b> {user?.ChiNhanh?.Ten || "Không xác định"}
        </div>

        {/* ===== SỐ LƯỢNG ===== */}
        <input
          type="number"
          min={1}
          max={selectedTonKho?.SoLuong || 1}
          className="w-full border p-2 rounded"
          value={form.soLuong}
          onChange={(e) =>
            setForm((prev) => ({ ...prev, soLuong: Number(e.target.value) }))
          }
        />

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Gửi yêu cầu nhập hàng
        </button>
      </form>
    </div>
  );
}
