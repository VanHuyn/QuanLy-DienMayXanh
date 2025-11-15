import { FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  return (
    <div className="bg-white rounded-xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-lg transition-shadow cursor-pointer flex flex-col group">
      <Link
        to={`/san-pham/${product.id}`}
        className="relative w-full pt-[100%] overflow-hidden bg-white"
      >
        <img
          src={product.image}
          alt={product.name}
          className="absolute top-0 left-0 w-full h-full object-contain p-4 transition-transform duration-300 group-hover:scale-105"
        />
      </Link>

      <div className="p-3 flex flex-col flex-1">
        <Link to={`/product/${product.id}`} className="transition-colors duration-300">
          <h3 className="text-gray-800 font-medium text-sm md:text-base line-clamp-2 mb-2 group-hover:text-blue-600">
            {product.name}
          </h3>
        </Link>
        <div className="flex items-center gap-2 mb-1">
          <span className="text-red-600 font-bold text-base md:text-lg">
            {product.salePrice.toLocaleString()}₫
          </span>
          {product.originalPrice && (
            <span className="text-gray-400 line-through text-sm">
              {product.originalPrice.toLocaleString()}₫
            </span>
          )}
          {product.originalPrice && (
            <span className="bg-red-100 text-red-600 text-xs font-semibold px-1.5 py-0.5 rounded">
              -{Math.round(
                ((product.originalPrice - product.salePrice) / product.originalPrice) * 100
              )}
              %
            </span>
          )}
        </div>
        <div className="flex items-center justify-between text-xs md:text-sm text-gray-500 mt-auto">
          <div className="flex items-center gap-1">
            {Array.from({ length: 5 }, (_, i) => (
              <FaStar
                key={i}
                className={i < product.rating ? "text-yellow-400" : "text-gray-300"}
                size={12}
              />
            ))}
            <span>({product.rating})</span>
          </div>
          <span>{product.sold.toLocaleString()} bán</span>
        </div>
      </div>
    </div>
  );
}
