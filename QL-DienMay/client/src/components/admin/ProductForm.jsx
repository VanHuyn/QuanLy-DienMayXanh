import { useState } from "react";
import { useCategories } from "../../context/CategoryContext";

export default function ProductForm({
  form,
  onChange,
  onSubmit,
  onCancel,
  isEdit,
  loading,
}) {
  const { categories } = useCategories();
  const [images, setImages] = useState([]);

  return (
    <form
      onSubmit={(e) => onSubmit(e, images)}
      className="bg-white p-6 rounded-xl shadow mb-6 grid grid-cols-1 md:grid-cols-2 gap-4"
    >
      <h2 className="md:col-span-2 text-xl font-bold text-blue-700">
        {isEdit ? "Cập nhật sản phẩm" : "Thêm sản phẩm"}
      </h2>

      {/* TÊN */}
      <input
        name="Ten"
        value={form.Ten}
        onChange={onChange}
        placeholder="Tên sản phẩm *"
        required
        className="border p-2 rounded"
      />

      {/* SKU */}
      <input
        name="SKU"
        value={form.SKU || ""}
        onChange={onChange}
        placeholder="SKU"
        className="border p-2 rounded"
      />

      {/* GIÁ */}
      <input
        type="number"
        name="Gia"
        value={form.Gia}
        onChange={onChange}
        placeholder="Giá gốc *"
        required
        className="border p-2 rounded"
      />

      {/* GIÁ KHUYẾN MÃI */}
      <input
        type="number"
        name="GiaKhuyenMai"
        value={form.GiaKhuyenMai || ""}
        onChange={onChange}
        placeholder="Giá khuyến mãi"
        className="border p-2 rounded"
      />

      {/* THƯƠNG HIỆU */}
      <input
        name="ThuongHieu"
        value={form.ThuongHieu || ""}
        onChange={onChange}
        placeholder="Thương hiệu"
        className="border p-2 rounded"
      />

      {/* XUẤT XỨ */}
      <input
        name="XuatXu"
        value={form.XuatXu || ""}
        onChange={onChange}
        placeholder="Xuất xứ"
        className="border p-2 rounded"
      />

      {/* TRỌNG LƯỢNG */}
      <input
        type="number"
        step="0.01"
        name="TrongLuong"
        value={form.TrongLuong || ""}
        onChange={onChange}
        placeholder="Trọng lượng (kg)"
        className="border p-2 rounded"
      />

      {/* KÍCH THƯỚC */}
      <input
        name="KichThuoc"
        value={form.KichThuoc || ""}
        onChange={onChange}
        placeholder="Kích thước (DxRxC)"
        className="border p-2 rounded"
      />

      {/* DANH MỤC */}
      <select
        name="DanhMucId"
        value={form.DanhMucId || ""}
        onChange={onChange}
        required
        className="border p-2 rounded"
      >
        <option value="">-- Chọn danh mục --</option>
        {categories.map((c) => (
          <option key={c.Id} value={c.Id}>
            {c.Ten}
          </option>
        ))}
      </select>

      {/* TRẠNG THÁI */}
      <select
        name="TrangThai"
        value={form.TrangThai}
        onChange={onChange}
        className="border p-2 rounded"
      >
        <option value="DangBan">Đang bán</option>
        <option value="TamNgung">Tạm ngưng</option>
        <option value="HetHang">Hết hàng</option>
      </select>

      {/* MÔ TẢ */}
      <textarea
        name="MoTa"
        value={form.MoTa || ""}
        onChange={onChange}
        placeholder="Mô tả sản phẩm"
        rows={3}
        className="border p-2 rounded md:col-span-2"
      />

      {/* ẢNH */}
      <div className="md:col-span-2">
        <label className="font-medium block mb-1">Ảnh sản phẩm</label>
        {/* INPUT FILE ẨN */}
        <input
          id="product-images"
          type="file"
          multiple
          accept="image/*"
          onChange={(e) => setImages([...e.target.files])}
          className="hidden"
        />

        {/* LABEL GIẢ LÀ NÚT */}
        <label
          htmlFor="product-images"
          className="inline-flex items-center justify-center px-4 py-2 border-2 border-dashed border-blue-400 rounded-lg cursor-pointer text-blue-600 hover:bg-blue-50 transition"
        >
          📷 Click vào đây để chọn ảnh sản phẩm
        </label>

        {/* PREVIEW */}
        {images.length > 0 && (
          <div className="flex gap-2 mt-3 flex-wrap">
            {images.map((img, i) => (
              <img
                key={i}
                src={URL.createObjectURL(img)}
                className="w-20 h-20 object-cover rounded border"
              />
            ))}
          </div>
        )}
      </div>

      {/* BUTTON */}
      <div className="md:col-span-2 flex justify-end gap-3">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border rounded"
        >
          Huỷ
        </button>
        <button
          disabled={loading}
          className={`px-4 py-2 rounded text-white ${
            loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600"
          }`}
        >
          {loading ? "Đang xử lý..." : isEdit ? "Cập nhật" : "Thêm mới"}
        </button>
      </div>
    </form>
  );
}
