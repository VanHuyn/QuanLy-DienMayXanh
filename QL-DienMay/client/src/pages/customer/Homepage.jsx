import { useState } from "react";
import CategorySection from "../../components/customer/CategorySection";
import ImgBgHomePage from "../../components/customer/ImgBgHomePage";
import ProductCard from "../../components/customer/ProductCard";
import SwipperHomePage from "../../components/customer/SwipperHomePage";
import { testProducts } from "../../data";

export default function Homepage() {
  const categories = [
    "Nồi cơm",
    "Nồi chiên",
    "Máy lạnh",
    "Tủ lạnh",
    "Máy sấy",
    "Máy lọc nước",
    "Bếp âm",
  ];
  const [activeCategory, setActiveCategory] = useState(categories[0]);

  // Lọc sản phẩm theo category
  const filteredProducts = testProducts.filter(
    (p) => p.category === activeCategory
  );

  return (
    <main className="relative">
      <ImgBgHomePage />
      <div className="relative z-10 max-w-7xl mx-auto py-6 px-4">
        <img
          className="h-60 mx-auto w-full rounded-3xl"
          src="https://cdnv2.tgdd.vn/mwg-static/dmx/Banner/2f/35/2f354c8f13e2316bc4b51f9ec31e245c.png"
          alt=""
        />
        <section className="text-white font-bold mt-4">
          <CategorySection />
        </section>
        {/* Tabs danh mục */}
        <section className="mt-8 overflow-x-auto bg-[#fc0] p-3 rounded-2xl py-4">
          <div className="flex gap-3  px-3 py-2 rounded-full min-w-max bg-white">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`px-4 py-2 rounded-full font-semibold transition-all whitespace-nowrap ${
                  activeCategory === cat
                    ? "bg-[#fc0] text-black shadow-md scale-105"
                    : "bg-transparent text-black/70 hover:text-black "
                }`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
          {/* Sản phẩm theo tab */}
          <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
        <SwipperHomePage />
        <section className="mt-8 rounded-2xl bg-white py-4">
          <h3 className="text-2xl font-bold px-6">Gợi ý cho bạn</h3>
          <div className="p-3">
            <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
              {testProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>
        <section className="mx-auto px-4 py-6">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-8 text-start relative">
            THÁNG PANASONIC 🎉
          </h2>
          <div className="overflow-hidden rounded-2xl shadow-lg border border-gray-200">
            <img
              src="https://cdnv2.tgdd.vn/mwg-static/dmx/Banner/d9/6f/d96ffb65be264128e21815661d3aa869.jpg"
              alt="Tháng Panasonic"
              className="w-full object-cover"
            />
          </div>
        </section>
        <section className="mx-auto px-4 py-6">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-10 text-start relative">
            Gian hàng ưu đãi
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {[
              "https://cdnv2.tgdd.vn/mwg-static/dmx/Banner/a6/e5/a6e503e2bbab9b936d6934ae85521431.png",
              "https://cdnv2.tgdd.vn/mwg-static/dmx/Banner/0f/c2/0fc2dfd608dcc1cf346fb58b34a8b291.png",
              "https://cdnv2.tgdd.vn/mwg-static/dmx/Banner/a2/12/a212fe7af151596e8b5a44312a65b9ca.png",
              "https://cdnv2.tgdd.vn/mwg-static/dmx/Banner/93/af/93af3462952c46963ed79d9dc4bdc604.png",
            ].map((img, i) => (
              <div
                key={i}
                className="overflow-hidden rounded-xl shadow-md hover:shadow-lg transition transform hover:-translate-y-1"
              >
                <img
                  src={img}
                  alt={`Banner ${i + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
