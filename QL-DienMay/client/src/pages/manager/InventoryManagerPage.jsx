import { useEffect } from "react";
import Meta from "../../components/Meta";
import { useInventory } from "../../context/InventoryContext";
import useAuth from "../../hooks/useAuth";

export default function InventoryManagerPage() {
  const { user } = useAuth();
  const { inventories, loading, fetchMyBranchInventories } = useInventory();

  const khoChiNhanhId = user?.ChiNhanh;
  const tenChiNhanh = user?.ChiNhanh?.Ten;
    console.log(user)
  useEffect(() => {
    if (khoChiNhanhId) {
      fetchMyBranchInventories(khoChiNhanhId?.Id);
    }
  }, [khoChiNhanhId]);

  const renderStatus = (soLuong) => {
    if (soLuong === 0) {
      return (
        <span className="px-2 py-1 text-xs rounded bg-red-100 text-red-600">
          Hết hàng
        </span>
      );
    }

    if (soLuong < 5) {
      return (
        <span className="px-2 py-1 text-xs rounded bg-yellow-100 text-yellow-700">
          Sắp hết
        </span>
      );
    }

    return (
      <span className="px-2 py-1 text-xs rounded bg-green-100 text-green-600">
        Còn hàng
      </span>
    );
  };

  return (
    <div className="p-6">
      <Meta title="Tồn kho chi nhánh" />

      <div className="mb-6">
        <h1 className="text-2xl font-bold">Tồn kho chi nhánh</h1>
        <p className="text-gray-500 text-sm">
          Chi nhánh quản lý:{" "}
          <span className="font-semibold text-gray-700">
            {tenChiNhanh}
          </span>
        </p>
      </div>

      {loading ? (
        <div className="text-center py-10 text-gray-500">
          Đang tải dữ liệu tồn kho...
        </div>
      ) : (
        <div className="bg-white shadow-lg rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="p-4 text-left">Sản phẩm</th>
                <th className="p-4 text-left">Biến thể</th>
                <th className="p-4 text-center">Số lượng</th>
                <th className="p-4 text-center">Trạng thái</th>
              </tr>
            </thead>

            <tbody>
              {inventories.map((item) => (
                <tr
                  key={item.Id}
                  className="border-b hover:bg-gray-50 transition"
                >
                  {/* Sản phẩm */}
                  <td className="p-4">
                    <div className="font-semibold">
                      {item.BienThe?.SanPham?.Ten}
                    </div>
                    <div className="text-xs text-gray-500">
                      SKU: {item.BienThe?.SanPham?.SKU}
                    </div>
                  </td>

                  {/* Biến thể */}
                  <td className="p-4">
                    {item.BienThe?.Ten !== "Mặc định" ? (
                      <span className="px-2 py-1 text-xs rounded bg-blue-100 text-blue-600">
                        {item.BienThe.Ten}
                      </span>
                    ) : (
                      <span className="text-gray-400 italic">—</span>
                    )}
                  </td>

                  {/* Số lượng */}
                  <td className="p-4 text-center text-lg font-bold">
                    {item.SoLuong}
                  </td>

                  {/* Trạng thái */}
                  <td className="p-4 text-center">
                    {renderStatus(item.SoLuong)}
                  </td>
                </tr>
              ))}

              {inventories.length === 0 && (
                <tr>
                  <td colSpan="4" className="p-8 text-center text-gray-500">
                    Không có dữ liệu tồn kho
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
