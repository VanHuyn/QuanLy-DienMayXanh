import { FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  if (!product) return null;
  const gia = Number(product.Gia || 0);
  const giaKM = Number(product.GiaKhuyenMai || gia);
  const imageUrl =
    product.AnhDaiDien ||
    product.AnhSanPhams?.[0]?.Url ||
    "https://via.placeholder.com/300x300?text=No+Image";

  return (
    <div className="bg-white rounded-xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-lg transition-shadow cursor-pointer flex flex-col group">
      <Link
        to={`/san-pham/${product.Id}`}
        className="relative w-full pt-[100%] overflow-hidden bg-white"
      >
        <img
          src={imageUrl}
          alt={product.Ten}
          className="absolute top-0 left-0 w-full h-full object-contain p-4 transition-transform duration-300 group-hover:scale-105"
        />
      </Link>
      <div className="p-3 flex flex-col flex-1">
        <Link to={`/san-pham/${product.Id}`}>
          <h3 className="text-gray-800 font-medium text-sm md:text-base line-clamp-2 mb-2 group-hover:text-blue-600">
            {product.Ten}
          </h3>
        </Link>
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
        <div className="flex items-center justify-between text-xs md:text-sm text-gray-500 mt-auto">
          <div className="flex items-center gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <FaStar
                key={i}
                size={12}
                className={i < 4 ? "text-yellow-400" : "text-gray-300"}
              />
            ))}
            <span>(4.0)</span>
          </div>

          {/* Nếu CHƯA có tồn kho thì bỏ */}
          {product.SoLuong !== undefined && <span>Còn {product.SoLuong}</span>}
        </div>
      </div>
    </div>
  );
}
