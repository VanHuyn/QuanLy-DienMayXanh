import { Pencil, Trash2 } from "lucide-react";

export default function SupplierList({ suppliers, onEdit, onDelete }) {
  return (
    <div className="bg-white rounded-xl shadow overflow-hidden">
      <table className="w-full">
        <thead className="bg-blue-100">
          <tr>
            <th className="p-3 text-left">ID</th>
            <th className="p-3 text-left">Tên</th>
            <th className="p-3 text-left">SĐT</th>
            <th className="p-3 text-left">Email</th>
            <th className="p-3 text-left">Địa chỉ</th>
            <th className="p-3 text-center">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {suppliers.map((s) => (
            <tr key={s.Id} className="border-t">
              <td className="p-3">{s.Id}</td>
              <td className="p-3 font-medium">{s.Ten}</td>
              <td className="p-3">{s.SoDienThoai}</td>
              <td className="p-3">{s.Email}</td>
              <td className="p-3">{s.DiaChi}</td>
              <td className="p-3 text-center">
                <div className="flex justify-center gap-2">
                  <button
                    onClick={() => onEdit(s)}
                    className="text-blue-600"
                  >
                    <Pencil size={18} />
                  </button>
                  <button
                    onClick={() => onDelete(s)}
                    className="text-red-600"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
