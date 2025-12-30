import { useLocation } from "react-router-dom";
import { useMemo } from "react";
import { useInventory } from "../../context/InventoryContext";
import { useBranches } from "../../context/BranchContext";
import ProductCard from "../../components/customer/ProductCard";

export default function SearchPage() {
  const { inventories, loading } = useInventory();
  const { selectedBranch } = useBranches();
  const location = useLocation();
  console.log(location);
  // Lấy query từ URL
  const query = new URLSearchParams(location.search).get("query") || "";

  // Lọc sản phẩm tồn kho của chi nhánh
  const branchInventories = useMemo(() => {
    if (!selectedBranch) return [];

    return inventories.filter((i) => {
      if (i.BienThe?.SanPham?.TrangThai !== "DangBan") return false;
      if (Number(i.SoLuong) <= 0) return false;

      // Lọc theo chi nhánh
      return i.KhoChiNhanh?.ChiNhanhId === selectedBranch.Id;
    });
  }, [inventories, selectedBranch]);

  const filteredProducts = useMemo(() => {
    return branchInventories.filter((i) =>
      (i.BienThe?.SanPham?.Ten || "")
        .toLowerCase()
        .includes(query.toLowerCase())
    );
  }, [branchInventories, query]);

  if (!selectedBranch) {
    return (
      <p className="text-center mt-10">
        Vui lòng chọn chi nhánh để tìm sản phẩm
      </p>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Kết quả tìm kiếm: "{query}"</h2>

      {loading && <p>Đang tải sản phẩm...</p>}
      {!loading && filteredProducts.length === 0 && (
        <p>Không tìm thấy sản phẩm nào</p>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {filteredProducts.map((item) => (
          <ProductCard key={item.Id} product={item.BienThe?.SanPham} />
        ))}
      </div>
    </div>
  );
}
