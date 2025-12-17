import { Pencil, Trash2 } from "lucide-react";

export default function CategoryList({ categories, onEdit, onDelete }) {
  return (
    <div className="bg-white rounded-xl shadow overflow-hidden">
      <table className="w-full">
        <thead className="bg-blue-100">
          <tr>
            <th className="p-3 text-left">ID</th>
            <th className="p-3 text-left">Tên</th>
            <th className="p-3 text-left">Mô tả</th>
            <th className="p-3 text-center">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((c,index) => (
            <tr key={c.Id} className="border-t">
              <td className="p-3">{index+1}</td>
              <td className="p-3 font-medium">{c.Ten}</td>
              <td className="p-3">{c.MoTa}</td>
              <td className="p-3 text-center">
                <div className="flex justify-center gap-2">
                  <button
                    onClick={() => onEdit(c)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <Pencil size={18} />
                  </button>
                  <button
                    onClick={() => onDelete(c)}
                    className="text-red-600 hover:text-red-800"
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
