import { Pencil, Trash2 } from "lucide-react";

export default function WarehouseList({ warehouses, onEdit, onDelete }) {
  return (
    <div className="bg-white rounded-xl shadow overflow-hidden">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-linear-to-r from-blue-600 to-blue-500 text-white">
            <th className="p-4 text-left font-semibold">Tên kho</th>
            <th className="p-4 text-left font-semibold">Địa chỉ</th>
            <th className="p-4 text-right font-semibold">Hành động</th>
          </tr>
        </thead>

        <tbody>
          {warehouses.map((w) => (
            <tr
              key={w.Id}
              className="border-b hover:bg-blue-50 transition"
            >
              <td className="p-4 font-medium text-gray-800">
                {w.Ten}
              </td>
              <td className="p-4 text-gray-600">
                {w.DiaChi || "—"}
              </td>
              <td className="p-4 text-right">
                <div className="inline-flex gap-2">
                  <button
                    onClick={() => onEdit(w)}
                    className="inline-flex items-center gap-1 px-3 py-1.5 text-blue-600 border border-blue-200 rounded-lg hover:bg-blue-100 transition"
                  >
                    <Pencil size={14} />
                    Sửa
                  </button>

                  <button
                    onClick={() => onDelete(w.Id)}
                    className="inline-flex items-center gap-1 px-3 py-1.5 text-red-600 border border-red-200 rounded-lg hover:bg-red-100 transition"
                  >
                    <Trash2 size={14} />
                    Xoá
                  </button>
                </div>
              </td>
            </tr>
          ))}

          {warehouses.length === 0 && (
            <tr>
              <td colSpan="3" className="p-8 text-center text-gray-500">
                <div className="flex flex-col items-center gap-2">
                  <span className="text-3xl">🏬</span>
                  <p className="font-medium">Chưa có kho tổng nào</p>
                  <p className="text-sm">
                    Hãy tạo kho tổng đầu tiên để quản lý tồn kho
                  </p>
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
