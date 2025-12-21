import { useState } from "react";
import { useBranches } from "../../context/BranchContext";

export default function BranchWarehouseForm({
  form,
  onChange,
  onSubmit,
  onCancel,
  isEdit,
}) {
  const { branches } = useBranches(); 
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!form.Ten || form.Ten.trim() === "") {
      newErrors.Ten = "Tên kho không được để trống";
    }
    if (!form.ChiNhanhId) {
      newErrors.ChiNhanhId = "Bạn phải chọn một chi nhánh";
    }
    if (form.DiaChi && form.DiaChi.length > 255) {
      newErrors.DiaChi = "Địa chỉ không được quá 255 ký tự";
    }
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      onSubmit(e);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-4 rounded-lg shadow mb-4 grid grid-cols-2 gap-4"
    >
      <div className="col-span-2">
        <input
          name="Ten"
          value={form.Ten}
          onChange={onChange}
          placeholder="Tên kho chi nhánh"
          className={`border p-2 rounded w-full ${
            errors.Ten ? "border-red-500" : ""
          }`}
        />
        {errors.Ten && (
          <p className="text-red-500 text-sm mt-1">{errors.Ten}</p>
        )}
      </div>
      <div className="col-span-2">
        <select
          name="ChiNhanhId"
          value={form.ChiNhanhId}
          onChange={onChange}
          className={`border p-2 rounded w-full ${
            errors.ChiNhanhId ? "border-red-500" : ""
          }`}
        >
          <option value="">Lựa chọn chi nhánh</option>
          {branches.map((b) => (
            <option key={b.Id} value={b.Id}>
              {b.Ten}
            </option>
          ))}
        </select>
        {errors.ChiNhanhId && (
          <p className="text-red-500 text-sm mt-1">{errors.ChiNhanhId}</p>
        )}
      </div>
      <div className="col-span-2">
        <input
          name="DiaChi"
          value={form.DiaChi}
          onChange={onChange}
          placeholder="Địa chỉ"
          className={`border p-2 rounded w-full ${
            errors.DiaChi ? "border-red-500" : ""
          }`}
        />
        {errors.DiaChi && (
          <p className="text-red-500 text-sm mt-1">{errors.DiaChi}</p>
        )}
      </div>
      <div className="col-span-2 flex justify-end gap-2">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border rounded"
        >
          Huỷ
        </button>
        <button className="px-4 py-2 bg-blue-600 text-white rounded">
          {isEdit ? "Cập nhật" : "Thêm"}
        </button>
      </div>
    </form>
  );
}
