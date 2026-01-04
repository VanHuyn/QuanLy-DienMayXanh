import { useState } from "react";
import { useInventory } from "../../context/InventoryContext";

export default function InventoryCheckPage() {
  const { inventories, loading, updateSoLuongThucTe, submitInventoryCheck } =
    useInventory();

  const [ghiChu, setGhiChu] = useState("");
  const khoTongItem = inventories.find((i) => i.KhoTongId !== null);
  const KhoTongId = khoTongItem?.KhoTongId;

  console.log(" KhoTongId ", KhoTongId);
  if (loading) return <div>Đang tải tồn kho...</div>;
  console.log(inventories);
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Kiểm kê & Điều chỉnh tồn kho</h1>

      <div className="bg-white shadow rounded-lg overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 text-left">Sản phẩm</th>
              <th className="p-2">Biến thể</th>
              <th className="p-2">Tồn hệ thống</th>
              <th className="p-2">Tồn thực tế</th>
              <th className="p-2">Chênh lệch</th>
            </tr>
          </thead>
          <tbody>
            {inventories.map((i) => {
              const diff = Number(i.SoLuongThucTe) - Number(i.SoLuong);
              return (
                <tr key={i.Id} className="border-t">
                  <td className="p-2">{i.BienThe?.SanPham?.Ten}</td>
                  <td className="p-2 text-center">{i.BienThe?.Ten}</td>
                  <td className="p-2 text-center">{i.SoLuong}</td>
                  <td className="p-2 text-center">
                    <input
                      type="number"
                      min={0}
                      value={i.SoLuongThucTe}
                      onChange={(e) =>
                        updateSoLuongThucTe(i.Id, e.target.value)
                      }
                      className="w-20 border rounded px-2 py-1 text-center"
                    />
                  </td>
                  <td
                    className={`p-2 text-center font-semibold ${
                      diff > 0
                        ? "text-green-600"
                        : diff < 0
                        ? "text-red-600"
                        : ""
                    }`}
                  >
                    {diff}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <textarea
        className="w-full border rounded p-2 mt-4"
        placeholder="Ghi chú kiểm kê..."
        value={ghiChu}
        onChange={(e) => setGhiChu(e.target.value)}
      />

      <div className="text-right mt-4">
        <button
          onClick={() => submitInventoryCheck(KhoTongId, ghiChu)}
          disabled={!KhoTongId}
          className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700"
        >
          Xác nhận kiểm kê
        </button>
      </div>
    </div>
  );
}
