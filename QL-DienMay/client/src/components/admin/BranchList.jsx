import { Pencil, Trash2 } from "lucide-react";

export default function BranchList({ branches, onEdit, onDelete }) {
  return (
    <div className="bg-white rounded-lg shadow overflow-x-auto">
      <table className="w-full text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2">Tên</th>
            <th className="p-2">Mã</th>
            <th className="p-2">Điện thoại</th>
            <th className="p-2">Email</th>
            <th className="p-2">Địa chỉ</th>
            <th className="p-2">Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {branches.map((b) => (
            <tr key={b.Id} className="border-t">
              <td className="p-2">{b.Ten}</td>
              <td className="p-2 text-center">{b.Ma}</td>
              <td className="p-2">{b.SoDienThoai}</td>
              <td className="p-2">{b.Email}</td>
              <td className="p-2">{b.DiaChi}</td>
              <td className="p-2 flex gap-2 justify-center">
                <button onClick={() => onEdit(b)}>
                  <Pencil size={16} />
                </button>
                <button onClick={() => onDelete(b.Id)}>
                  <Trash2 size={16} className="text-red-600" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
