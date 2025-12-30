import { useState } from "react";

export default function SellProductModal({ product, onClose, branchId }) {
  const [quantity, setQuantity] = useState(1);

  if (!product) return null;

  const maxQuantity = product.SoLuong || 1;
  const gia = Number(product.Gia || 0);
  const giaKM = Number(product.GiaKhuyenMai || gia);

  const handleAddToInvoice = () => {
    if (quantity < 1 || quantity > maxQuantity) {
      alert(`Số lượng phải từ 1 đến ${maxQuantity}`);
      return;
    }
    // TODO: Gọi context hoặc API để thêm vào hóa đơn
    console.log("Thêm vào hóa đơn:", { product, quantity, branchId });
    onClose();
  };

  const imageUrl =
    product.AnhDaiDien ||
    product.AnhSanPhams?.[0]?.Url ||
    "https://via.placeholder.com/150x150?text=No+Image";

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl max-w-lg shadow-xl relative overflow-hidden">
        {/* Nút đóng nổi bật */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 bg-gray-200 hover:bg-gray-300 rounded-full w-8 h-8 flex items-center justify-center text-gray-800 font-bold text-lg z-10"
        >
          ×
        </button>

        {/* Hình ảnh sản phẩm */}
        <div className="flex justify-center bg-gray-50 p-4">
          <img src={imageUrl} alt={product.Ten} className="h-40 object-contain" />
        </div>

        <div className="p-6">
          <h2 className="text-xl font-bold mb-2">{product.Ten}</h2>
          <p className="text-sm text-gray-600 mb-2">{product.MoTa || "Không có mô tả"}</p>

          <div className="mb-3">
            <span className="text-red-600 font-bold text-lg">{giaKM.toLocaleString()}₫</span>
            {giaKM < gia && (
              <span className="text-gray-400 line-through ml-2">{gia.toLocaleString()}₫</span>
            )}
          </div>

          <div className="mb-4 text-sm text-gray-600">
            Tồn kho hiện tại: <span className="font-semibold">{maxQuantity}</span>
          </div>

          <div className="mb-4">
            <label className="block mb-1 font-semibold">Số lượng</label>
            <input
              type="number"
              min={1}
              max={maxQuantity}
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="w-full border p-2 rounded"
            />
          </div>

          <button
            onClick={handleAddToInvoice}
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors"
          >
            Thêm vào hóa đơn
          </button>
        </div>
      </div>
    </div>
  );
}
