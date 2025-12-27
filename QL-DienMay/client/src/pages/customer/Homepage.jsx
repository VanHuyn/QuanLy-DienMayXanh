import { useState, useMemo } from "react";
import CategorySection from "../../components/customer/CategorySection";
import ImgBgHomePage from "../../components/customer/ImgBgHomePage";
import ProductCard from "../../components/customer/ProductCard";
import SwipperHomePage from "../../components/customer/SwipperHomePage";

import { useInventory } from "../../context/InventoryContext";
import { useBranches } from "../../context/BranchContext";

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

  const CATEGORY_MAP = {
    "Nồi cơm": 1,
    "Nồi chiên": 2,
    "Máy lạnh": 3,
    "Tủ lạnh": 4,
    "Máy sấy": 5,
    "Máy lọc nước": 6,
    "Bếp âm": 7,
  };

  const [activeCategory, setActiveCategory] = useState(categories[0]);

  const { inventories, loading } = useInventory();
  const { selectedBranch } = useBranches();

  const branchInventories = useMemo(() => {
    if (!selectedBranch) return [];

    return inventories.filter(
      (i) =>
        i.KhoChiNhanh?.ChiNhanhId === selectedBranch.Id &&
        Number(i.SoLuong) > 0 &&
        i.BienThe?.SanPham?.TrangThai === "DangBan"
    );
  }, [inventories, selectedBranch]);

  console.log(selectedBranch);

  const filteredProducts = useMemo(() => {
    if (!activeCategory) return branchInventories;

    return branchInventories.filter(
      (i) => i.BienThe?.SanPham?.DanhMucId === CATEGORY_MAP[activeCategory]
    );
  }, [branchInventories, activeCategory]);
  console.log(branchInventories);

  return (
    <main className="relative">
      <ImgBgHomePage />

      <div className="relative z-10 max-w-7xl mx-auto py-6 px-4">
        {/* Banner */}
        <img
          className="h-60 mx-auto w-full rounded-3xl object-cover"
          src="https://cdnv2.tgdd.vn/mwg-static/dmx/Banner/2f/35/2f354c8f13e2316bc4b51f9ec31e245c.png"
          alt=""
        />

        <section className="text-white font-bold mt-4">
          <CategorySection />
        </section>

        {/* ================= TAB CATEGORY ================= */}
        <section className="mt-8 overflow-x-auto bg-[#fc0] p-3 rounded-2xl py-4">
          {/* Tabs */}
          <div className="flex gap-3 px-3 py-2 rounded-full min-w-max bg-white">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full font-semibold transition-all whitespace-nowrap
                  ${
                    activeCategory === cat
                      ? "bg-[#fc0] text-black shadow-md scale-105"
                      : "text-black/70 hover:text-black"
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Products */}
          <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
            {!selectedBranch && (
              <p className="col-span-full text-center text-gray-600">
                Vui lòng chọn chi nhánh để xem sản phẩm
              </p>
            )}

            {loading && selectedBranch && (
              <p className="col-span-full text-center text-gray-600">
                Đang tải sản phẩm...
              </p>
            )}

            {!loading && selectedBranch && filteredProducts.length === 0 && (
              <p className="col-span-full text-center text-gray-600">
                Danh mục này hiện chưa có sản phẩm
              </p>
            )}

            {filteredProducts.map((item) => {
              const sp = item?.BienThe?.SanPham;
              return <ProductCard key={item.Id} product={sp} />;
            })}
          </div>
        </section>

        <SwipperHomePage />

        <section className="mt-8 rounded-2xl bg-white py-4">
          <h3 className="text-2xl font-bold px-6">Gợi ý cho bạn</h3>

          <div className="p-3">
            <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
              {!selectedBranch && (
                <p className="col-span-full text-center text-gray-600">
                  Vui lòng chọn chi nhánh để xem sản phẩm
                </p>
              )}

              {branchInventories?.map((item) => {
                const sp = item?.BienThe?.SanPham;

                return <ProductCard key={item.Id} product={sp} />;
              })}
            </div>
          </div>
        </section>

        {/* ================= BANNER ================= */}
        <section className="mx-auto px-4 py-6">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-8">
            THÁNG PANASONIC 🎉
          </h2>
          <img
            src="https://cdnv2.tgdd.vn/mwg-static/dmx/Banner/d9/6f/d96ffb65be264128e21815661d3aa869.jpg"
            className="rounded-2xl w-full object-cover"
            alt=""
          />
        </section>
      </div>
    </main>
  );
}
