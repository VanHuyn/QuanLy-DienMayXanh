export default function BranchActions({ selected, onConfirm, onCancel }) {
  if (!selected) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-96 shadow-lg">
        <h2 className="text-lg font-bold mb-2 text-red-600">
          Xác nhận xoá chi nhánh
        </h2>
        <p className="text-gray-600 mb-4">
          Bạn có chắc chắn muốn xoá chi nhánh này không?
        </p>

        <div className="flex justify-end gap-2">
          <button
            onClick={onCancel}
            className="px-4 py-2 border rounded"
          >
            Huỷ
          </button>
          <button
            onClick={() => onConfirm(selected)}
            className="px-4 py-2 bg-red-600 text-white rounded"
          >
            Xoá
          </button>
        </div>
      </div>
    </div>
  );
}
