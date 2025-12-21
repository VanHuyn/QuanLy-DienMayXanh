export default function SupplierImportActions({
  selected,
  onConfirm,
  onCancel,
}) {
  if (!selected) return null;

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-lg font-semibold mb-4">
          Bạn có chắc chắn muốn huỷ phiếu nhập này?
        </h3>

        <div className="flex justify-end gap-2">
          <button
            onClick={onCancel}
            className="px-4 py-2 border rounded"
          >
            Không
          </button>
          <button
            onClick={() => onConfirm(selected)}
            className="px-4 py-2 bg-red-600 text-white rounded"
          >
            Huỷ phiếu
          </button>
        </div>
      </div>
    </div>
  );
}
