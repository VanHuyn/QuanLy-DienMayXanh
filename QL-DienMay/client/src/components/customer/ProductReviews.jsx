import { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import { useRating } from "../../context/RatingContext";

export default function ProductReviews({ productId }) {
  const { ratings, fetchRatings } = useRating();
  const [reviews, setReviews] = useState([]);
  const [visibleCount, setVisibleCount] = useState(3); 

  useEffect(() => {
    if (productId) fetchRatings(productId);
  }, [productId]);
  useEffect(() => {
    if (ratings) {
      const mapped = ratings.map((r) => ({
        name: r.KhachHang?.NguoiDung?.HoTen || "Khách hàng",
        rating: r.SoSao,
        content: r.NoiDung,
      }));
      setReviews(mapped);
    }
  }, [ratings]);

  if (reviews.length === 0) {
    return (
      <p className="text-gray-500">
        Chưa có đánh giá nào. Hãy là người đầu tiên đánh giá sản phẩm!
      </p>
    );
  }

  const visibleReviews = reviews.slice(0, visibleCount);

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 3);
  };

  return (
    <div className="space-y-4">
      {visibleReviews.map((r, idx) => (
        <div
          key={idx}
          className="border rounded-xl p-4 shadow-sm hover:shadow-md transition"
        >
          <div className="flex items-center gap-2 mb-2">
            {Array.from({ length: 5 }, (_, i) => (
              <FaStar
                key={i}
                className={i < r.rating ? "text-yellow-400" : "text-gray-300"}
              />
            ))}
            <span className="text-gray-500 text-sm">{r.name}</span>
          </div>
          <p className="text-gray-700">{r.content}</p>
        </div>
      ))}

      {visibleCount < reviews.length && (
        <button
          onClick={handleLoadMore}
          className="text-blue-600 hover:underline font-medium"
        >
          Xem thêm
        </button>
      )}
    </div>
  );
}
