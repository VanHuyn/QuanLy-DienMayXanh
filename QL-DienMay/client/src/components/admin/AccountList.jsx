import React from "react";
import { Pencil, Trash2 } from "lucide-react";

export default function AccountList({ accounts, roles, onEdit, onDelete }) {
  return (
    <div className="overflow-hidden rounded-2xl shadow-lg border border-gray-200 mt-6">
      <table className="w-full text-left">
        <thead className="bg-blue-600 text-white">
          <tr>
            <th className="px-5 py-4">#</th>
            <th className="px-5 py-4">Họ tên</th>
            <th className="px-5 py-4">Email</th>
            <th className="px-5 py-4">Chi nhánh</th>
            <th className="px-5 py-4">Vai trò</th>
            <th className="px-5 py-4 text-center">Hành động</th>
          </tr>
        </thead>

        <tbody>
          {Array.isArray(accounts) && accounts.length > 0 ? (
            accounts.map((acc, index) => (
              <tr
                key={acc.Id}
                className="border-b even:bg-gray-50 hover:bg-blue-50/70 transition-all"
              >
                <td className="px-5 py-4 font-semibold text-gray-800">
                  {index + 1}
                </td>
                <td className="px-5 py-4 text-blue-700 font-semibold">
                  {acc.HoTen}
                </td>
                <td className="px-5 py-4 text-gray-700">{acc.Email}</td>
                <td className="px-5 py-4">
                  {acc.NhanVien?.ChiNhanh?.Ten || "—"}
                </td>

                <td className="px-5 py-4 text-gray-700">
                  {acc.VaiTro?.Ten ||
                    roles?.find((r) => r.Id === acc.VaiTroId)?.Ten ||
                    "—"}
                </td>
                <td className="px-5 py-4">
                  <div className="flex justify-center gap-3">
                    <button
                      onClick={() => onEdit(acc)}
                      className="p-2 bg-yellow-400 text-white rounded-full shadow hover:bg-yellow-500 active:scale-90 transition"
                    >
                      <Pencil size={18} />
                    </button>
                    <button
                      onClick={() => onDelete(acc)}
                      className="p-2 bg-red-500 text-white rounded-full shadow hover:bg-red-600 active:scale-90 transition"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan="5"
                className="text-center py-8 text-gray-500 italic text-lg"
              >
                Không có tài khoản nào...
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
