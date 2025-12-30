import { useNavigate } from "react-router-dom";
import { Eye, Check } from "lucide-react";
import { useSupplierImports } from "../../context/SupplierImportContext";

export default function SupplierImportListWarehouse({ imports }) {
  const navigate = useNavigate();
  const { confirmImport, fetchImports } = useSupplierImports();

  const handleConfirm = async (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xác nhận nhập kho?")) {
      await confirmImport(id);
      await fetchImports(); // reload danh sách
      alert("Nhập kho thành công!");
    }
  };

  return (
    <div className="bg-white rounded-lg shadow">
      <table className="w-full text-left">
        <thead className="bg-green-200">
          <tr>
            <th className="p-3">ID</th>
            <th className="p-3">Nhà cung cấp</th>
            <th className="p-3">Kho tổng</th>
            <th className="p-3">Trạng thái</th>
            <th className="p-3 text-right">Hành động</th>
          </tr>
        </thead>

        <tbody>
          {imports.map((p) => (
            <tr key={p.Id} className="border-t hover:bg-gray-50">
              <td className="p-3">{p.Id}</td>
              <td className="p-3">{p.NhaCungCap?.Ten}</td>
              <td className="p-3">{p.KhoTong?.Ten}</td>
              <td className="p-3">
                <span
                  className={`px-2 py-1 rounded text-sm ${
                    p.TrangThai === "ChoNhap"
                      ? "bg-yellow-100 text-yellow-800"
                      : p.TrangThai === "DaNhap"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {p.TrangThai}
                </span>
              </td>

              <td className="p-3 text-right flex justify-end gap-2">
                <button
                  onClick={() => navigate(`/warehouse/import/${p.Id}`)}
                  className="inline-flex items-center gap-1 text-blue-600 hover:underline"
                >
                  <Eye size={16} /> Chi tiết
                </button>

                {p.TrangThai === "ChoNhap" && (
                  <button
                    onClick={() => handleConfirm(p.Id)}
                    className="inline-flex items-center gap-1 px-3 py-1 bg-green-600 text-white rounded"
                  >
                    <Check size={16} /> Nhập kho
                  </button>
                )}
              </td>
            </tr>
          ))}

          {imports.length === 0 && (
            <tr>
              <td colSpan="5" className="p-4 text-center text-gray-500">
                Chưa có phiếu nhập nào
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
