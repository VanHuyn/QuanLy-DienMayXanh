export default function WarehouseForm({
  form,
  onChange,
  onSubmit,
  onCancel,
  isEdit,
}) {
  return (
    <form
      onSubmit={onSubmit}
      className="bg-white p-4 rounded-lg shadow mb-6 space-y-4"
    >
      <input
        name="Ten"
        value={form.Ten}
        onChange={onChange}
        placeholder="Tên kho"
        className="w-full border p-2 rounded"
        required
      />

      <input
        name="DiaChi"
        value={form.DiaChi}
        onChange={onChange}
        placeholder="Địa chỉ kho"
        className="w-full border p-2 rounded"
      />

      <div className="flex gap-2">
        <button className="bg-blue-600 text-white px-4 py-2 rounded">
          {isEdit ? "Cập nhật" : "Thêm mới"}
        </button>

        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border rounded"
        >
          Huỷ
        </button>
      </div>
    </form>
  );
}
