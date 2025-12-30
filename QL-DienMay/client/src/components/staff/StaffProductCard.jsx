import { FaStar } from "react-icons/fa";

export default function StaffProductCard({ product, onSell }) {
  if (!product) return null;

  const gia = Number(product.Gia || 0);
  const giaKM = Number(product.GiaKhuyenMai || gia);
  const imageUrl =
    product.AnhDaiDien ||
    product.AnhSanPhams?.[0]?.Url ||
    "https://via.placeholder.com/300x300?text=No+Image";

  return (
    <div className="bg-white rounded-xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-lg transition-shadow flex flex-col group">
      {/* Hình ảnh sản phẩm */}
      <div className="relative w-full pt-[100%] overflow-hidden bg-white">
        <img
          src={imageUrl}
          alt={product.Ten}
          className="absolute top-0 left-0 w-full h-full object-contain p-4 transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      {/* Thông tin sản phẩm */}
      <div className="p-3 flex flex-col flex-1">
        <h3 className="text-gray-800 font-medium text-sm md:text-base line-clamp-2 mb-2">
          {product.Ten}
        </h3>

        <div className="flex items-center gap-2 mb-1 flex-wrap">
          <span className="text-red-600 font-bold text-base md:text-lg">
            {giaKM.toLocaleString()}₫
          </span>

          {giaKM < gia && (
            <>
              <span className="text-gray-400 line-through text-sm">
                {gia.toLocaleString()}₫
              </span>
              <span className="bg-red-100 text-red-600 text-xs font-semibold px-1.5 py-0.5 rounded">
                -{Math.round(((gia - giaKM) / gia) * 100)}%
              </span>
            </>
          )}
        </div>

        {/* Tồn kho chi nhánh */}
        <div className="text-gray-600 text-sm mb-2">
          <span className="font-semibold">Tồn kho: </span>
          {product.SoLuong || 0} sản phẩm
        </div>

        {/* Nút bán hàng */}
        <button
          onClick={() => onSell(product)}
          className="mt-auto bg-blue-600 text-white text-sm font-semibold py-2 rounded hover:bg-blue-700 transition-colors"
        >
          Bán hàng
        </button>

        {/* Rating tạm */}
        <div className="flex items-center gap-1 text-xs text-gray-400 mt-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <FaStar
              key={i}
              size={12}
              className={i < 4 ? "text-yellow-400" : "text-gray-300"}
            />
          ))}
          <span>(4.0)</span>
        </div>
      </div>
    </div>
  );
}
