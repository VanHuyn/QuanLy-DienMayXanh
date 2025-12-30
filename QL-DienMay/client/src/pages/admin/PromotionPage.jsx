import { useEffect, useState } from "react";
import { usePromotion } from "../../context/PromotionContext";

const emptyForm = {
  Ma: "",
  Ten: "",
  PhanTramGiam: "",
  NgayBatDau: "",
  NgayKetThuc: "",
  ApDungChoTatCa: false,
};

export default function PromotionPage() {
  const {
    promotions,
    loading,
    createPromotion,
    updatePromotion,
    deletePromotion,
    fetchPromotions,
  } = usePromotion();

  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchPromotions();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editingId) {
      await updatePromotion(editingId, form);
    } else {
      await createPromotion(form);
    }

    setForm(emptyForm);
    setEditingId(null);
  };

  const handleEdit = (promo) => {
    setEditingId(promo.Id);
    setForm({
      Ma: promo.Ma || "",
      Ten: promo.Ten,
      PhanTramGiam: promo.PhanTramGiam || "",
      NgayBatDau: promo.NgayBatDau?.slice(0, 10) || "",
      NgayKetThuc: promo.NgayKetThuc?.slice(0, 10) || "",
      ApDungChoTatCa: promo.ApDungChoTatCa,
    });
  };

  const handleCancel = () => {
    setForm(emptyForm);
    setEditingId(null);
  };

  return (
    <div className=" mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">
        Quản lý chương trình khuyến mãi
      </h1>

      {/* FORM */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-4 rounded-lg shadow mb-8 grid grid-cols-1 md:grid-cols-3 gap-4"
      >
        <input
          name="Ma"
          value={form.Ma}
          onChange={handleChange}
          placeholder="Mã khuyến mãi"
          className="border px-3 py-2 rounded"
        />

        <input
          name="Ten"
          value={form.Ten}
          onChange={handleChange}
          placeholder="Tên chương trình khuyến mãi"
          required
          className="border px-3 py-2 rounded"
        />

        <input
          name="PhanTramGiam"
          type="number"
          value={form.PhanTramGiam}
          onChange={handleChange}
          placeholder="Phần trăm giảm (%)"
          className="border px-3 py-2 rounded"
        />

        <input
          name="NgayBatDau"
          type="date"
          value={form.NgayBatDau}
          onChange={handleChange}
          className="border px-3 py-2 rounded"
        />

        <input
          name="NgayKetThuc"
          type="date"
          value={form.NgayKetThuc}
          onChange={handleChange}
          className="border px-3 py-2 rounded"
        />

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="ApDungChoTatCa"
            checked={form.ApDungChoTatCa}
            onChange={handleChange}
          />
          Áp dụng cho tất cả sản phẩm
        </label>

        <div className="md:col-span-3 flex gap-3">
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            {editingId ? "Cập nhật" : "Thêm khuyến mãi"}
          </button>

          {editingId && (
            <button
              type="button"
              onClick={handleCancel}
              className="bg-gray-300 px-4 py-2 rounded"
            >
              Huỷ
            </button>
          )}
        </div>
      </form>

      {/* TABLE */}
      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="min-w-full border">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 border">ID</th>
              <th className="px-4 py-2 border">Mã</th>
              <th className="px-4 py-2 border">Tên khuyến mãi</th>
              <th className="px-4 py-2 border">% giảm</th>
              <th className="px-4 py-2 border">Thời gian</th>
              <th className="px-4 py-2 border">Áp dụng tất cả</th>
              <th className="px-4 py-2 border">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="7" className="text-center py-4">
                  Đang tải dữ liệu...
                </td>
              </tr>
            ) : promotions?.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center py-4">
                  Chưa có chương trình khuyến mãi nào
                </td>
              </tr>
            ) : (
              promotions?.map((p) => (
                <tr key={p.Id} className="hover:bg-gray-50">
                  <td className="px-4 py-2 border">{p.Id}</td>
                  <td className="px-4 py-2 border">{p.Ma || "-"}</td>
                  <td className="px-4 py-2 border">{p.Ten}</td>
                  <td className="px-4 py-2 border">
                    {p.PhanTramGiam ? `${p.PhanTramGiam}%` : "-"}
                  </td>
                  <td className="px-4 py-2 border text-sm">
                    {p.NgayBatDau?.slice(0, 10)} →{" "}
                    {p.NgayKetThuc?.slice(0, 10)}
                  </td>
                  <td className="px-4 py-2 border text-center">
                    {p.ApDungChoTatCa ? "✔" : "✖"}
                  </td>
                  <td className="px-4 py-2 border">
                    <div className="flex gap-3">
                      <button
                        onClick={() => handleEdit(p)}
                        className="text-blue-600 hover:underline"
                      >
                        Sửa
                      </button>
                      <button
                        onClick={() => deletePromotion(p.Id)}
                        className="text-red-600 hover:underline"
                      >
                        Xoá
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
