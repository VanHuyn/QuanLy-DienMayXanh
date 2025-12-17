export default function SupplierForm({
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
        {isEdit ? "Cập nhật nhà cung cấp" : "Thêm nhà cung cấp"}
      </h2>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block mb-1 font-medium">Tên NCC</label>
          <input
            name="Ten"
            value={form.Ten}
            onChange={onChange}
            className="w-full border rounded-lg px-3 py-2"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Số điện thoại</label>
          <input
            name="SoDienThoai"
            value={form.SoDienThoai || ""}
            onChange={onChange}
            className="w-full border rounded-lg px-3 py-2"
          />
        </div>

        <div className="col-span-2">
          <label className="block mb-1 font-medium">Email</label>
          <input
            name="Email"
            value={form.Email || ""}
            onChange={onChange}
            className="w-full border rounded-lg px-3 py-2"
          />
        </div>

        <div className="col-span-2">
          <label className="block mb-1 font-medium">Địa chỉ</label>
          <textarea
            name="DiaChi"
            value={form.DiaChi || ""}
            onChange={onChange}
            className="w-full border rounded-lg px-3 py-2"
          />
        </div>
      </div>

      <div className="flex justify-end gap-2 mt-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border rounded-lg"
        >
          Huỷ
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg"
        >
          {isEdit ? "Cập nhật" : "Thêm mới"}
        </button>
      </div>
    </form>
  );
}
