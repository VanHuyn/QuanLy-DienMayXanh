export default function CategoryActions({
  selected,
  onConfirm,
  onCancel,
}) {
  if (!selected) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <div className="bg-white p-6 rounded-xl shadow w-96">
        <h3 className="text-lg font-semibold mb-3">
          Xoá danh mục
        </h3>
        <p className="mb-4">
          Bạn có chắc muốn xoá danh mục
          <strong> {selected.Ten}</strong>?
        </p>

        <div className="flex justify-end gap-2">
          <button
            onClick={onCancel}
            className="px-4 py-2 border rounded-lg"
          >
            Huỷ
          </button>
          <button
            onClick={() => onConfirm(selected.Id)}
            className="px-4 py-2 bg-red-600 text-white rounded-lg"
          >
            Xoá
          </button>
        </div>
      </div>
    </div>
  );
}
