export default function ProductActions({ selected, onConfirm, onCancel }) {
  if (!selected) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-sm">
        <h3 className="text-lg font-bold mb-3 text-red-600">
          Xác nhận xoá
        </h3>
        <p className="text-gray-600 mb-6">
          Bạn có chắc chắn muốn xoá sản phẩm này không?
        </p>

        <div className="flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 border rounded-lg"
          >
            Huỷ
          </button>
          <button
            onClick={() => onConfirm(selected)}
            className="px-4 py-2 bg-red-600 text-white rounded-lg"
          >
            Xoá
          </button>
        </div>
      </div>
    </div>
  );
}
