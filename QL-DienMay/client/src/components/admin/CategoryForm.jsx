export default function CategoryForm({
  form,
  onChange,
  onSubmit,
  onCancel,
  isEdit,
}) {
  return (
    <form
      onSubmit={onSubmit}
      className="bg-white p-6 rounded-xl shadow mb-6"
    >
      <h2 className="text-xl font-semibold mb-4">
        {isEdit ? "Cập nhật danh mục" : "Thêm danh mục"}
      </h2>

      <div className="mb-4">
        <label className="block mb-1 font-medium">Tên danh mục</label>
        <input
          name="Ten"
          value={form.Ten}
          onChange={onChange}
          className="w-full border rounded-lg px-3 py-2"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1 font-medium">Mô tả</label>
        <textarea
          name="MoTa"
          value={form.MoTa || ""}
          onChange={onChange}
          className="w-full border rounded-lg px-3 py-2"
        />
      </div>

      <div className="flex justify-end gap-2">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 rounded-lg border"
        >
          Huỷ
        </button>
        <button
          type="submit"
          className="px-4 py-2 rounded-lg bg-blue-600 text-white"
        >
          {isEdit ? "Cập nhật" : "Thêm mới"}
        </button>
      </div>
    </form>
  );
}
