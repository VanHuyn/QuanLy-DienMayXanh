import React from "react";
import { AlertTriangle } from "lucide-react";

export default function AccountActions({ selected, onConfirm, onCancel }) {
  if (!selected) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center animate-fadeIn">
      <div className="bg-white w-[400px] p-7 rounded-2xl shadow-2xl animate-popup">
        <div className="flex items-center gap-3 mb-4">
          <AlertTriangle className="text-red-500" size={32} />
          <h3 className="text-2xl font-bold text-red-600">Xác nhận xoá</h3>
        </div>
        <p className="text-gray-700 mb-6 leading-relaxed">
          Bạn có chắc chắn muốn xoá tài khoản
          <span className="font-semibold text-red-600">"{selected.HoTen}"</span>
          ?
        </p>
        <div className="flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 text-gray-700 bg-gray-200 rounded-xl hover:bg-gray-300 active:scale-95 transition"
          >
            Huỷ
          </button>

          <button
            onClick={() => onConfirm(selected.Id)}
            className="px-5 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700 active:scale-95 transition"
          >
            Xoá
          </button>
        </div>
      </div>
    </div>
  );
}
