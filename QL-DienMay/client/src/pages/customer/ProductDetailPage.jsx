import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useProducts } from "../../context/ProductContext";
import { useCart } from "../../context/CartContext";
import useAuth from "../../hooks/useAuth";
import { FaStar } from "react-icons/fa";
import Meta from "../../components/Meta";
import { useRating } from "../../context/RatingContext";
import toast from "react-hot-toast";
import ProductReviews from "../../components/customer/ProductReviews";
export default function ProductDetailPage() {
  const { id } = useParams();
  const { addItem } = useCart();
  const { user, logout } = useAuth();
  console.log(user);
  const {
    currentProduct,
    getProductById,
    fetchProductsByCategory,
    categoryProducts,
    loading,
  } = useProducts();
  const { ratings, fetchRatings, createRating } = useRating();
  const [selectedImage, setSelectedImage] = useState(null);
  useEffect(() => {
    if (id) fetchRatings(id);
  }, [id]);

  const [newReview, setNewReview] = useState({
    name: "",
    rating: 0,
    content: "",
  });
  useEffect(() => {
    getProductById(id);
  }, [id]);
  useEffect(() => {
    if (currentProduct?.DanhMucId) {
      fetchProductsByCategory(currentProduct.DanhMucId);
    }
  }, [currentProduct]);
  useEffect(() => {
    if (currentProduct?.AnhSanPhams?.length) {
      const mainImg =
        currentProduct.AnhSanPhams.find((a) => a.LaChinh) ||
        currentProduct.AnhSanPhams[0];
      setSelectedImage(mainImg.Url);
    }
  }, [currentProduct]);
  if (!currentProduct)
    return (
      <div className="text-center py-20 text-gray-500">
        Sản phẩm không tồn tại
      </div>
    );

  const discountPercent = currentProduct.GiaKhuyenMai
    ? Math.round(
        ((currentProduct.GiaKhuyenMai - currentProduct.Gia) /
          currentProduct.GiaKhuyenMai) *
          100
      )
    : 0;
  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!user) return toast.error("Bạn cần đăng nhập để đánh giá sản phẩm");
    if (!newReview.rating || !newReview.content)
      return toast.error("Vui lòng chọn số sao và viết nhận xét");

    try {
      const res = await createRating({
        SanPhamId: id,
        SoSao: newReview.rating,
        NoiDung: newReview.content,
      });
      if (res.success) {
        toast.success("Đánh giá thành công");
        setNewReview({ rating: 0, content: "" });
      } else {
        toast.error(res.message || "Không thể đánh giá sản phẩm");
      }
    } catch (err) {
      toast.error(err.message || "Lỗi khi đánh giá sản phẩm");
    }
  };
  const handleAddToCart = async () => {
    if (!user) {
      toast.error("Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng");
      return;
    }

    try {
      const defaultVariant = currentProduct.BienTheSanPhams?.[0];
      if (!defaultVariant) {
        toast.error("Sản phẩm chưa có biến thể");
        return;
      }

      await addItem({
        bienTheId: defaultVariant.Id,
        quantity: 1,
        customerId: user.KhachHang?.Id,
      });
    } catch (err) {
      toast.error(err.message || "Không thể thêm sản phẩm vào giỏ hàng");
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <Meta title={currentProduct?.Ten} />
      <div className="max-w-7xl mx-auto px-4 py-3 text-gray-600 text-sm flex flex-wrap gap-2">
        <Link to="/" className="hover:text-blue-600">
          Nồi chiên không dầu
        </Link>
        <span>›</span>
        <span className="font-medium text-gray-800">{currentProduct.name}</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col md:flex-row gap-8">
        <div className="md:w-7/10 flex flex-col gap-6">
          <div className="bg-white p-4 rounded-2xl shadow-lg flex justify-center items-center transition-transform hover:scale-105">
            <img
              src={selectedImage}
              alt={currentProduct.name}
              className="object-contain h-96"
            />
          </div>

          <div className="flex gap-3 overflow-x-auto py-2 px-3">
            {currentProduct.AnhSanPhams?.map((img, idx) => (
              <img
                key={img.Id || idx}
                src={img.Url}
                alt={`thumb-${idx}`}
                className={`w-24 h-24 object-contain rounded-xl cursor-pointer border-2 transition-all ${
                  selectedImage === img.Url
                    ? "border-blue-500 scale-105"
                    : "border-gray-200 hover:scale-105"
                }`}
                onClick={() => setSelectedImage(img.Url)}
              />
            ))}
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-md flex flex-col gap-3">
            <p className="font-semibold text-gray-800 text-lg">
              Điện Máy XANH cam kết
            </p>
            <ul className="text-gray-700 text-sm space-y-1 pl-4 list-disc">
              <li>
                Hư gì đổi nấy 12 tháng tại 2961 siêu thị toàn quốc (miễn phí
                tháng đầu)
              </li>
              <li>Bảo hành chính hãng 1 năm tại các trung tâm bảo hành hãng</li>
              <li>Giao hàng tận nhà nhanh chóng</li>
            </ul>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-md mt-6">
            <h3 className="font-semibold text-gray-800 text-lg mb-4">
              Viết đánh giá của bạn
            </h3>
            <form onSubmit={handleReviewSubmit} className="flex flex-col gap-4">
              {/* Star rating */}
              <div className="flex items-center gap-3">
                <span className="font-medium text-gray-700">Đánh giá:</span>
                <div className="flex gap-1">
                  {Array.from({ length: 5 }, (_, i) => (
                    <FaStar
                      key={i}
                      size={28}
                      className={`cursor-pointer transition-colors ${
                        i < newReview.rating
                          ? "text-yellow-400"
                          : "text-gray-300"
                      } hover:text-yellow-400`}
                      onClick={() =>
                        setNewReview({ ...newReview, rating: i + 1 })
                      }
                    />
                  ))}
                </div>
                {newReview.rating > 0 && (
                  <span className="text-gray-600 text-sm ml-2">
                    {newReview.rating} sao
                  </span>
                )}
              </div>

              {/* Textarea */}
              <textarea
                placeholder="Nhập đánh giá..."
                value={newReview.content}
                onChange={(e) =>
                  setNewReview({ ...newReview, content: e.target.value })
                }
                className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-400 focus:outline-none resize-none text-gray-700 placeholder-gray-400"
                rows={5}
                required
              />

              {/* Submit button */}
              <button
                type="submit"
                className="bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-3 rounded-xl transition-all shadow-md"
              >
                Gửi đánh giá
              </button>
            </form>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-md flex flex-col gap-4">
            <h2 className="font-semibold text-gray-800 text-lg">
              Đánh giá khách hàng
            </h2>
            <ProductReviews productId={id} />
          </div>
        </div>

        <div className="md:w-3/10 flex flex-col gap-5">
          <div className="bg-linear-to-r from-yellow-300 to-yellow-400 text-yellow-900 p-4 rounded-xl text-center font-semibold shadow-md">
            Flash Sale - Giảm giá sốc!
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-md flex flex-col gap-3">
            <span className="text-red-600 text-3xl font-bold">
              {currentProduct?.Gia?.toLocaleString()}₫
            </span>
            {currentProduct?.GiaKhuyenMai && (
              <div className="flex items-center gap-3">
                <span className="line-through text-gray-400">
                  {currentProduct?.GiaKhuyenMai?.toLocaleString()}₫
                </span>
                <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm font-semibold">
                  -{discountPercent}%
                </span>
              </div>
            )}
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-md flex flex-col gap-2 text-gray-700">
            <p className="font-semibold mb-2">Khuyến mãi trị giá 300.000₫</p>
            <ul className="text-sm space-y-1 pl-4 list-disc">
              <li>
                Chọn 1 trong các khuyến mãi: Máy vắt cam Rapido ROJ-40D /
                ROJ-40C
              </li>
              <li>Phiếu mua hàng Quạt bàn/hộp trị giá 100.000₫</li>
              <li>Phiếu mua hàng nồi cơm trị giá 100.000₫</li>
              <li>Phiếu mua hàng Máy lọc không khí trị giá 300.000₫</li>
              <li>Trả chậm 0% lãi suất qua Kredivo</li>
            </ul>
          </div>

          <div className="flex flex-col gap-3">
            <button className="bg-linear-to-r from-indigo-500 to-indigo-600 cursor-pointer hover:from-indigo-600 hover:to-indigo-700 text-white font-semibold py-3 rounded-xl transition-all shadow-md">
              Mua ngay
            </button>
            <button
              onClick={handleAddToCart}
              className="border border-gray-300 hover:border-gray-500 cursor-pointer text-gray-800 font-medium py-3 rounded-xl transition-all shadow-sm"
            >
              Thêm vào giỏ
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <h2 className="font-semibold text-gray-800 mb-4 text-xl">
          Sản phẩm liên quan
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5">
          {categoryProducts
            ?.filter((p) => p.Id !== Number(id))
            .slice(0, 4)
            .map((p) => {
              const image = p.AnhSanPhams?.[0]?.Url;

              return (
                <Link
                  key={p.Id}
                  to={`/san-pham/${p.Id}`}
                  className="bg-white p-4 rounded-2xl border border-gray-100 shadow hover:shadow-lg transition transform hover:-translate-y-1"
                >
                  <img
                    src={image || "/no-image.png"}
                    alt={p.Ten}
                    className="object-contain h-44 w-full mb-3 rounded-xl"
                  />

                  <p className="text-gray-800 font-medium text-sm line-clamp-2 mb-1">
                    {p.Ten}
                  </p>

                  <p className="text-red-600 font-bold text-lg">
                    {Number(p.Gia).toLocaleString()}₫
                  </p>
                </Link>
              );
            })}
        </div>
      </div>
    </div>
  );
}
