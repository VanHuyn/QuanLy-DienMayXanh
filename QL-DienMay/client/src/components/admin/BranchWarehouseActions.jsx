export default function BranchWarehouseActions({ selected, onConfirm, onCancel }) {
  if (!selected) return null;

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h3 className="text-lg font-semibold mb-4">
          Are you sure you want to delete this branch warehouse?
        </h3>
        <p className="mb-4">
          <strong>{selected.Ten}</strong> ({selected.ChiNhanh?.Ten || "No branch"})
        </p>

        <div className="flex justify-end gap-2">
          <button
            onClick={onCancel}
            className="px-4 py-2 border rounded hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            onClick={() => onConfirm(selected.Id)}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
