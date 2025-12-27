import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { testProducts } from "../../data/index";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { useProducts } from "../../context/ProductContext";
import { useBranches } from "../../context/BranchContext";
export default function CategoryPage() {
  const [filterOpen, setFilterOpen] = useState(false);
    const { slug } = useParams(); // slug từ URL
  const { selectedBranch } = useBranches();
  const { categoryProducts, fetchProductsByCategorySlug, loading } = useProducts();
  useEffect(() => {
    if (slug) {
      fetchProductsByCategorySlug(slug,selectedBranch?.Id);
    }
  }, [slug]);
  console.log(categoryProducts)
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 py-3 text-gray-600 text-sm flex flex-wrap gap-2">
        <Link to="/" className="hover:text-blue-600">
          Trang chủ
        </Link>
        <span>›</span>
        <span className="font-medium text-gray-800">Máy lọc nước</span>
      </div>

      {/* Banner lớn */}
      <div className="max-w-7xl mx-auto px-4 py-4 bg-[#0058cd] rounded-xl">
        <img
          src="https://cdnv2.tgdd.vn/mwg-static/dmx/Banner/ee/3a/ee3a9b4edac071198c2fef5f0c3b3d5b.png"
          alt="Banner"
          className="w-full rounded-xl shadow-lg object-cover"
        />
        {/* Top Hot Products Swiper */}
        <div className="max-w-7xl mx-auto px-4 py-6 relative">
          <Swiper
            modules={[Navigation]}
            slidesPerView={1} // mobile mặc định 1 slide
            spaceBetween={15}
            breakpoints={{
              640: { slidesPerView: 2 },
              768: { slidesPerView: 3 },
              1024: { slidesPerView: 4 },
              1280: { slidesPerView: 5 },
            }}
            navigation={{
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            }}
          >
            {categoryProducts.slice(0, 10).map((product) => (
              <SwiperSlide key={product.Id}>
                <Link
                  to={`/san-pham/${product.Id}`}
                  className="bg-white p-3 rounded-2xl shadow hover:shadow-xl transition flex flex-col items-center w-full sm:w-[180px] md:w-[200px] lg:w-[216px] h-[500px]"
                >
                  <img
                    src={product.AnhSanPhams?.[0]?.Url}
                    alt={product.Ten}
                    className="h-40 sm:h-48 md:h-52 lg:h-[300px] object-contain mb-2"
                  />
                  <p className="text-gray-800 font-medium text-sm line-clamp-2 text-center mt-2">
                    {product.Ten}
                  </p>
                  <p className="text-red-600 font-bold text-lg mt-auto">
                    {product.GiaKhuyenMai.toLocaleString()}₫
                  </p>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="swiper-button-prev rounded-full bg-white text-black p-2 shadow-lg absolute top-1/2 -left-3 transform -translate-y-1/2 cursor-pointer"></div>
          <div className="swiper-button-next rounded-full bg-white text-black p-2 shadow-lg absolute top-1/2 -right-3 transform -translate-y-1/2 cursor-pointer"></div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 py-4">
        <Swiper
          slidesPerView={1}
          spaceBetween={15}
          breakpoints={{ 640: { slidesPerView: 2 } }}
        >
          {[
            "https://cdnv2.tgdd.vn/mwg-static/dmx/Banner/39/07/390729d6a50a21d17438e371deb4d629.png",
            "https://cdnv2.tgdd.vn/mwg-static/dmx/Banner/5c/14/5c14cd209d46c79379642d6c18eca990.png",
            "https://cdnv2.tgdd.vn/mwg-static/dmx/Banner/8d/fd/8dfd65912f0a09b84aeb87f507c647f2.png",
            "https://cdnv2.tgdd.vn/mwg-static/dmx/Banner/1a/65/1a655aa5ea67e7924568314d60c4bbb8.png",
          ].map((banner, idx) => (
            <SwiperSlide key={idx}>
              <img
                src={banner}
                alt={`Banner-${idx}`}
                className="rounded-xl shadow-md w-full object-cover"
              />
            </SwiperSlide>
          ))}
          
        </Swiper>
      </div>
      <div className="max-w-7xl mx-auto px-4 py-4">
        <button
          className="bg-white px-4 py-2 rounded-xl shadow hover:shadow-md font-semibold flex items-center gap-2"
          onClick={() => setFilterOpen(!filterOpen)}
        >
          Bộ lọc sản phẩm
          <span>{filterOpen ? "▲" : "▼"}</span>
        </button>

        {filterOpen && (
          <div className="bg-white rounded-2xl shadow-md p-4 mt-3 space-y-4">
            <div>
              <p className="font-semibold mb-2">Giá tiền</p>
              <div className="flex gap-2 flex-wrap">
                {[
                  "Dưới 1 triệu",
                  "1 - 3 triệu",
                  "3 - 5 triệu",
                  "Trên 5 triệu",
                ].map((price, idx) => (
                  <button
                    key={idx}
                    className="border px-3 py-1 rounded hover:bg-gray-100"
                  >
                    {price}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <p className="font-semibold mb-2">Thương hiệu</p>
              <div className="flex gap-2 flex-wrap">
                {["Samsung", "Panasonic", "Sunhouse", "LG"].map(
                  (brand, idx) => (
                    <button
                      key={idx}
                      className="border px-3 py-1 rounded hover:bg-gray-100"
                    >
                      {brand}
                    </button>
                  )
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Product List */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
          {categoryProducts.slice(0, 20).map((product) => (
            <Link
              key={product.Id}
              to={`/san-pham/${product.Id}`}
              className="bg-white p-4 rounded-2xl border border-gray-100 shadow hover:shadow-lg transition transform hover:-translate-y-1 flex flex-col"
            >
              <img
                src={product.AnhSanPhams?.[0]?.Url}
                alt={product.Ten}
                className="w-full h-40 sm:h-48 md:h-52 lg:h-[300px] object-contain mb-2 rounded-xl"
              />
              <p className="text-gray-800 font-medium text-sm line-clamp-2 mb-1 mt-2">
                {product.Ten}
              </p>
              <p className="text-red-600 font-bold text-lg mt-auto">
                {product.GiaKhuyenMai.toLocaleString()}₫
              </p>
            </Link>
          ))}
        </div>
        <div className="flex justify-center mt-6">
          <button className="px-6 py-3 bg-indigo-500 hover:bg-indigo-600 text-white font-semibold rounded-xl shadow-md transition-all">
            Xem thêm
          </button>
        </div>
      </div>
    </div>
  );
}
