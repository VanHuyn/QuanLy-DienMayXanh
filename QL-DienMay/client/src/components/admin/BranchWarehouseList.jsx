import { Pencil, Trash2 } from "lucide-react";

export default function BranchWarehouseList({ branchWarehouses, onEdit, onDelete }) {
  return (
    <div className="bg-white rounded-lg shadow overflow-x-auto">
      <table className="w-full table-auto">
        <thead className="bg-blue-600 text-white">
          <tr>
            <th className="p-3 text-left">Tên kho chi nhánh</th>
            <th className="p-3 text-left">Chi nhánh</th>
            <th className="p-3 text-left">Địa chỉ</th>
            <th className="p-3 text-center w-40">Actions</th>
          </tr>
        </thead>
        <tbody>
          {branchWarehouses?.map((w) => (
            <tr key={w.Id} className="border-b hover:bg-gray-50 transition">
              <td className="p-3">{w.Ten}</td>
              <td className="p-3">{w.ChiNhanh?.Ten}</td>
              <td className="p-3">{w.DiaChi || "-"}</td>
              <td className="p-3 flex justify-center gap-3">
                <button
                  onClick={() => onEdit(w)}
                  className="p-2 rounded hover:bg-blue-100 text-blue-600"
                  title="Edit"
                >
                  <Pencil size={18} />
                </button>
                <button
                  onClick={() => onDelete(w)}
                  className="p-2 rounded hover:bg-red-100 text-red-600"
                  title="Delete"
                >
                  <Trash2 size={18} />
                </button>
              </td>
            </tr>
          ))}
          {branchWarehouses?.length === 0 && (
            <tr>
              <td colSpan={4} className="p-4 text-center text-gray-500">
                No branch warehouses found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
