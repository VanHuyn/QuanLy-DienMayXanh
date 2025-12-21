import { Pencil, Trash2 } from "lucide-react";

export default function ProductList({ products, onEdit, onDelete }) {
  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
      <table className="w-full text-sm">
        <thead className="bg-linear-to-r from-blue-600 to-blue-500 text-white">
          <tr>
            <th className="px-6 py-4 text-left">Sản phẩm</th>
            <th className="px-6 py-4 text-right">Giá</th>
            <th className="px-6 py-4 text-center">Trạng thái</th>
            <th className="px-6 py-4 text-center w-32">Thao tác</th>
          </tr>
        </thead>

        <tbody className="divide-y">
          {products.length === 0 && (
            <tr>
              <td colSpan="4" className="py-10 text-center text-gray-500">
                Chưa có sản phẩm
              </td>
            </tr>
          )}

          {products.map((p) => {
            const img = p.AnhSanPhams?.[0]; // lấy ảnh đầu tiên
            return (
              <tr key={p.Id} className="hover:bg-blue-50 transition">
                <td className="px-6 py-4">
                  <div className="flex gap-4 items-center">
                    <div className="w-14 h-14 rounded-lg overflow-hidden border bg-gray-100 shrink-0">
                      {img?.Url ? (
                        <img
                          src={
                            img.Url.startsWith("http")
                              ? img.Url
                              : `http://localhost:5000${img.Url}`
                          }
                          className="w-full h-full object-cover"
                          alt={p.Ten}
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-xs text-gray-400">
                          No img
                        </div>
                      )}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800 line-clamp-1">
                        {p.Ten}
                      </p>
                      <p className="text-xs text-gray-500">
                        SKU: {p.SKU || "---"}
                      </p>
                      {p.DanhMuc && (
                        <span className="text-xs text-blue-600 bg-blue-100 px-2 py-0.5 rounded-full">
                          {p.DanhMuc.Ten}
                        </span>
                      )}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-right font-semibold text-gray-800">
                  {Number(p.Gia).toLocaleString()} đ
                </td>
                <td className="px-6 py-4 text-center">
                  <span
                    className={`px-3 py-1 text-xs font-semibold rounded-full
                      ${
                        p.TrangThai === "DangBan"
                          ? "bg-green-100 text-green-700"
                          : p.TrangThai === "TamNgung"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                      }`}
                  >
                    {p.TrangThai}
                  </span>
                </td>

                <td className="px-6 py-4">
                  <div className="flex justify-center gap-3">
                    <button
                      onClick={() => onEdit(p)}
                      className="p-2 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-600 hover:text-white transition"
                    >
                      <Pencil size={16} />
                    </button>
                    <button
                      onClick={() => onDelete(p.Id)}
                      className="p-2 rounded-full bg-red-100 text-red-600 hover:bg-red-600 hover:text-white transition"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
