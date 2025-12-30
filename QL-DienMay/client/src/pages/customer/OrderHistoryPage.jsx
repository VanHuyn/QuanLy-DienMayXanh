import React, { useEffect, useContext } from "react";
import { useOrder } from "../../context/OrderContext";
import { AuthContext } from "../../context/AuthContext";

export default function OrderHistoryTable() {
  const { user } = useContext(AuthContext);
  const { orders, fetchOrders } = useOrder();
  console.log(orders);
  useEffect(() => {
    if (user?.Id) {
      fetchOrders();
    }
  }, [user]);

  const statusLabels = {
    ChoXacNhan: "Chờ xác nhận",
    DangGiao: "Đang giao",
    DaHoanTat: "Đã hoàn tất",
    DaHuy: "Đã hủy",
  };

  const statusColors = {
    ChoXacNhan: "bg-yellow-100 text-yellow-800",
    DangGiao: "bg-blue-100 text-blue-800",
    DaHoanTat: "bg-green-100 text-green-800",
    DaHuy: "bg-red-100 text-red-800",
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-gray-900">
        Lịch sử đặt hàng
      </h1>

      {orders.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">
          Bạn chưa có đơn hàng nào.
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg shadow-md border">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left px-4 py-3 font-medium text-gray-600">
                  Mã đơn
                </th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">
                  Ngày đặt
                </th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">
                  Trạng thái
                </th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">
                  Tổng tiền
                </th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">
                  Chi tiết
                </th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order,index) => (
                <tr
                  key={order.Id}
                  className="border-b hover:bg-gray-50 transition"
                >
                  <td className="px-4 py-3">#{index+1}</td>
                  <td className="px-4 py-3">
                    {new Date(order.NgayDat).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        statusColors[order.TrangThai]
                      }`}
                    >
                      {statusLabels[order.TrangThai] || "Không xác định"}
                    </span>
                  </td>
                  <td className="px-4 py-3 font-bold text-red-600">
                    {Number(order.TongTien).toLocaleString()}₫
                  </td>
                  <td className="px-4 py-3">
                    <details className="cursor-pointer">
                      <summary className="text-blue-500 hover:underline">
                        Xem chi tiết
                      </summary>
                      <div className="mt-2 space-y-4">
                        {order.ChiTietDonHangs.map((item) => {
                          const bienThe = item.BienTheSanPham;
                          const sanPham = bienThe?.SanPham;
                          const image =
                            sanPham?.AnhSanPhams?.[0]?.Url || "/no-image.png";

                          return (
                            <div
                              key={item.Id}
                              className="flex gap-4 items-center border-b py-2"
                            >
                              <img
                                src={image}
                                alt={bienThe?.Ten || "Sản phẩm"}
                                className="w-20 h-20 object-contain rounded-lg border"
                              />

                              <div className="flex-1">
                                <p className="font-semibold">
                                  {bienThe?.Ten || "Sản phẩm"}
                                </p>

                                <p className="text-gray-500 text-sm">
                                  Số lượng: {item.SoLuong} | Giá:{" "}
                                  {Number(
                                    bienThe?.Gia || item.DonGia
                                  ).toLocaleString()}
                                  ₫
                                </p>

                                <p className="text-gray-500 text-sm">
                                  Tổng:{" "}
                                  {Number(
                                    item.SoLuong * (bienThe?.Gia || item.DonGia)
                                  ).toLocaleString()}
                                  ₫
                                </p>
                              </div>
                            </div>
                          );
                        })}

                        {/* Thông tin bổ sung cho đơn hàng */}
                        <div className="text-gray-700 text-sm mt-2">
                          <p>
                            <strong>Địa chỉ giao:</strong>{" "}
                            {order.DiaChiChiTiet || "Chưa có"}
                          </p>
                          <p>
                            <strong>Mô tả:</strong> {order.MoTa || "Không có"}
                          </p>
                          <p>
                            <strong>Phương thức thanh toán:</strong>{" "}
                            {order.PhuongThucThanhToan?.toUpperCase() ||
                              "Chưa chọn"}
                          </p>
                        </div>
                      </div>
                    </details>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
