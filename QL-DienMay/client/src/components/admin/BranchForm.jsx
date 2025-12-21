import { useState, useEffect } from "react";

export default function BranchForm({
  form,
  onChange,
  onSubmit,
  onCancel,
  isEdit,
}) {
  const [errors, setErrors] = useState({});

  // validate mỗi khi form thay đổi
  useEffect(() => {
    validate();
  }, [form]);

  const validate = () => {
    const newErrors = {};

    // Tên chi nhánh (bắt buộc)
    if (!form.Ten || !form.Ten.trim()) {
      newErrors.Ten = "Tên chi nhánh không được để trống";
    }

    // Email (nếu có)
    if (
      form.Email &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.Email)
    ) {
      newErrors.Email = "Email không hợp lệ";
    }

    // Số điện thoại (nếu có)
    if (
      form.SoDienThoai &&
      !/^[0-9]{9,11}$/.test(form.SoDienThoai)
    ) {
      newErrors.SoDienThoai = "Số điện thoại phải từ 9–11 chữ số";
    }

    setErrors(newErrors);
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length === 0) {
      onSubmit(e);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-4 rounded-lg shadow mb-4 grid grid-cols-2 gap-4"
    >
      {/* Tên chi nhánh */}
      <div className="col-span-2">
        <input
          name="Ten"
          value={form.Ten}
          onChange={onChange}
          placeholder="Tên chi nhánh"
          className="border p-2 rounded w-full"
        />
        {errors.Ten && (
          <p className="text-red-600 text-sm mt-1">{errors.Ten}</p>
        )}
      </div>

      {/* Mã */}
      <input
        name="Ma"
        value={form.Ma}
        onChange={onChange}
        placeholder="Mã chi nhánh"
        className="border p-2 rounded"
      />

      {/* Số điện thoại */}
      <div>
        <input
          name="SoDienThoai"
          value={form.SoDienThoai}
          onChange={onChange}
          placeholder="Số điện thoại"
          className="border p-2 rounded w-full"
        />
        {errors.SoDienThoai && (
          <p className="text-red-600 text-sm mt-1">
            {errors.SoDienThoai}
          </p>
        )}
      </div>

      {/* Email */}
      <div>
        <input
          name="Email"
          value={form.Email}
          onChange={onChange}
          placeholder="Email"
          className="border p-2 rounded w-full"
        />
        {errors.Email && (
          <p className="text-red-600 text-sm mt-1">{errors.Email}</p>
        )}
      </div>

      {/* Địa chỉ */}
      <input
        name="DiaChi"
        value={form.DiaChi}
        onChange={onChange}
        placeholder="Địa chỉ"
        className="border p-2 rounded col-span-2"
      />

      <div className="col-span-2 flex justify-end gap-2">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border rounded"
        >
          Huỷ
        </button>
        <button
          disabled={Object.keys(errors).length > 0}
          className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
        >
          {isEdit ? "Cập nhật" : "Thêm mới"}
        </button>
      </div>
    </form>
  );
}
