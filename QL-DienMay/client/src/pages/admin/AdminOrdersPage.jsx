import React, { useEffect, useState } from "react";
import { useOrder } from "../../context/OrderContext";
import toast from "react-hot-toast";

const statusColors = {
  ChoXacNhan: "bg-yellow-200 text-yellow-800",
  DangGiao: "bg-blue-200 text-blue-800",
  DaHoanTat: "bg-green-200 text-green-800",
  DaHuy: "bg-red-200 text-red-800",
};

export default function AdminOrdersPage() {
  const { adminOrders, fetchAllOrders, fetchOrderDetail, updateOrderStatus } =
    useOrder();
  const [loading, setLoading] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    fetchAllOrders();
  }, []);

  const handleViewDetail = async (orderId) => {
    try {
      setLoading(true);
      const order = await fetchOrderDetail(orderId);
      setSelectedOrder(order);
    } catch (err) {
      toast.error("Không thể tải chi tiết đơn hàng");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleChangeStatus = async (orderId, e) => {
    const newStatus = e.target.value;
    try {
      await updateOrderStatus(orderId, newStatus);
      toast.success("Cập nhật trạng thái thành công");
    } catch (err) {
      toast.error("Cập nhật trạng thái thất bại");
      console.error(err);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Quản lý đơn hàng</h1>

      <div className="overflow-x-auto shadow-md rounded-lg">
        <table className="min-w-full bg-white border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 border">ID</th>
              <th className="px-4 py-2 border">Khách hàng</th>
              <th className="px-4 py-2 border">Tổng tiền</th>
              <th className="px-4 py-2 border">Trạng thái</th>
              <th className="px-4 py-2 border">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {adminOrders.map((order) => (
              <tr
                key={order.Id}
                className="hover:bg-gray-50 transition-colors duration-150"
              >
                <td className="px-4 py-2 border">{order.Id}</td>
                <td className="px-4 py-2 border">
                  {order.KhachHang?.NguoiDung?.HoTen || "Khách vãng lai"}
                </td>
                <td className="px-4 py-2 border">
                  {Number(order.TongTien).toLocaleString()} đ
                </td>
                <td className="px-4 py-2 border">
                  <select
                    value={order.TrangThai}
                    onChange={(e) => handleChangeStatus(order.Id, e)}
                    className={`px-2 py-1 rounded font-medium ${
                      statusColors[order.TrangThai] ||
                      "bg-gray-200 text-gray-800"
                    }`}
                  >
                    <option value="ChoXacNhan">Chờ xác nhận</option>
                    <option value="DangGiao">Đang xử lý</option>
                    <option value="DaHoanTat">Hoàn thành</option>
                    <option value="DaHuy">Hủy</option>
                  </select>
                </td>
                <td className="px-4 py-2 border">
                  <button
                    onClick={() => handleViewDetail(order.Id)}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded transition"
                  >
                    Xem chi tiết
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal chi tiết đơn hàng */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-4/5 max-h-[80vh] overflow-y-auto shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">
                Chi tiết đơn hàng #{selectedOrder.Id}
              </h2>
              <button
                onClick={() => setSelectedOrder(null)}
                className="text-white bg-red-500 px-3 py-1 rounded hover:bg-red-600 transition"
              >
                Đóng
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <p>
                  <strong>Khách hàng:</strong>{" "}
                  {selectedOrder.KhachHang?.NguoiDung?.HoTen ||
                    "Khách vãng lai"}
                </p>
                <p>
                  <strong>Email:</strong>{" "}
                  {selectedOrder.KhachHang?.NguoiDung?.Email || "-"}
                </p>
                <p>
                  <strong>Số điện thoại:</strong>{" "}
                  {selectedOrder.KhachHang?.NguoiDung?.SoDienThoai || "-"}
                </p>
                <p>
                  <strong>Địa chỉ:</strong>{" "}
                  {`${selectedOrder.TinhThanh || ""} ${
                    selectedOrder.QuanHuyen || ""
                  } ${selectedOrder.XaPhuong || ""} ${
                    selectedOrder.DiaChiChiTiet || ""
                  }`}
                </p>
              </div>
              <div>
                <p>
                  <strong>Tổng tiền:</strong>{" "}
                  {Number(selectedOrder.TongTien).toLocaleString()} đ
                </p>
                <p>
                  <strong>Phí vận chuyển:</strong>{" "}
                  {Number(selectedOrder.PhiVanChuyen || 0).toLocaleString()} đ
                </p>
                <p>
                  <strong>Trạng thái:</strong>{" "}
                  <span
                    className={`px-2 py-1 rounded font-medium ${
                      statusColors[selectedOrder.TrangThai] ||
                      "bg-gray-200 text-gray-800"
                    }`}
                  >
                    {selectedOrder.TrangThai}
                  </span>
                </p>
              </div>
            </div>

            <h3 className="text-xl font-semibold mb-2">Chi tiết sản phẩm</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full border border-gray-200">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-4 py-2 border">Hình</th>
                    <th className="px-4 py-2 border">Tên sản phẩm</th>
                    <th className="px-4 py-2 border">Số lượng</th>
                    <th className="px-4 py-2 border">Đơn giá</th>
                    <th className="px-4 py-2 border">Thành tiền</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedOrder && (
                    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
                      <div className="bg-white p-6 rounded-lg w-4/5 max-h-[80vh] overflow-y-auto shadow-lg">
                        {/* Header */}
                        <div className="flex justify-between items-center mb-4">
                          <h2 className="text-2xl font-bold">
                            Chi tiết đơn hàng #{selectedOrder.Id}
                          </h2>
                          <button
                            onClick={() => setSelectedOrder(null)}
                            className="text-white bg-red-500 px-3 py-1 rounded hover:bg-red-600 transition"
                          >
                            Đóng
                          </button>
                        </div>

                        {/* Thông tin khách hàng & đơn hàng */}
                        <div className="grid grid-cols-2 gap-4 mb-6">
                          <div>
                            <p>
                              <strong>Khách hàng:</strong>{" "}
                              {selectedOrder.KhachHang?.NguoiDung?.HoTen ||
                                "Khách vãng lai"}
                            </p>
                            <p>
                              <strong>Email:</strong>{" "}
                              {selectedOrder.KhachHang?.NguoiDung?.Email || "-"}
                            </p>
                            <p>
                              <strong>Số điện thoại:</strong>{" "}
                              {selectedOrder.KhachHang?.NguoiDung
                                ?.SoDienThoai || "-"}
                            </p>
                            <p>
                              <strong>Địa chỉ:</strong>{" "}
                              {`${selectedOrder.TinhThanh || ""} ${
                                selectedOrder.QuanHuyen || ""
                              } ${selectedOrder.XaPhuong || ""} ${
                                selectedOrder.DiaChiChiTiet || ""
                              }`}
                            </p>
                            <p>
                              <strong>Mô tả:</strong>{" "}
                              {selectedOrder.MoTa || "-"}
                            </p>
                          </div>
                          <div>
                            <p>
                              <strong>Tổng tiền:</strong>{" "}
                              {Number(selectedOrder.TongTien).toLocaleString()}{" "}
                              đ
                            </p>
                            <p>
                              <strong>Phí vận chuyển:</strong>{" "}
                              {Number(
                                selectedOrder.PhiVanChuyen || 0
                              ).toLocaleString()}{" "}
                              đ
                            </p>
                            <p>
                              <strong>Trạng thái:</strong>{" "}
                              <span
                                className={`px-2 py-1 rounded font-medium ${
                                  statusColors[selectedOrder.TrangThai] ||
                                  "bg-gray-200 text-gray-800"
                                }`}
                              >
                                {selectedOrder.TrangThai}
                              </span>
                            </p>
                            <p>
                              <strong>Phương thức thanh toán:</strong>{" "}
                              {selectedOrder.PhuongThucThanhToan}
                            </p>
                          </div>
                        </div>

                        {/* Chi tiết sản phẩm */}
                        <h3 className="text-xl font-semibold mb-2">
                          Chi tiết sản phẩm
                        </h3>
                        <div className="overflow-x-auto mb-4">
                          <table className="min-w-full border border-gray-200">
                            <thead className="bg-gray-100">
                              <tr>
                                <th className="px-4 py-2 border">Hình</th>
                                <th className="px-4 py-2 border">
                                  Tên sản phẩm
                                </th>
                                <th className="px-4 py-2 border">Số lượng</th>
                                <th className="px-4 py-2 border">Đơn giá</th>
                                <th className="px-4 py-2 border">Thành tiền</th>
                              </tr>
                            </thead>
                            <tbody>
                              {selectedOrder.ChiTietDonHangs?.map((ct) => {
                                const sp = ct.BienTheSanPham?.SanPham;
                                const img = sp?.AnhSanPhams?.find(
                                  (a) => a.LaChinh
                                )?.Url;
                                const donGia = Number(
                                  sp?.GiaKhuyenMai || sp?.Gia || 0
                                );
                                const thanhTien = donGia * ct.SoLuong;
                                return (
                                  <tr
                                    key={ct.Id}
                                    className="hover:bg-gray-50 transition"
                                  >
                                    <td className="px-2 py-1 border">
                                      {img ? (
                                        <img
                                          src={img}
                                          alt={sp.Ten}
                                          className="w-16 h-16 object-cover rounded"
                                        />
                                      ) : (
                                        <div className="w-16 h-16 bg-gray-200 flex items-center justify-center text-xs text-gray-500 rounded">
                                          No image
                                        </div>
                                      )}
                                    </td>
                                    <td className="px-2 py-1 border">
                                      {sp?.Ten || "Sản phẩm"}
                                    </td>
                                    <td className="px-2 py-1 border">
                                      {ct.SoLuong}
                                    </td>
                                    <td className="px-2 py-1 border">
                                      {donGia.toLocaleString()} đ
                                    </td>
                                    <td className="px-2 py-1 border">
                                      {thanhTien.toLocaleString()} đ
                                    </td>
                                  </tr>
                                );
                              })}
                            </tbody>
                          </table>
                        </div>

                        {/* Phiếu thanh toán */}
                        <h3 className="text-xl font-semibold mb-2">
                          Phiếu thanh toán
                        </h3>
                        <table className="min-w-full border border-gray-200 mb-4">
                          <thead className="bg-gray-100">
                            <tr>
                              <th className="px-4 py-2 border">ID</th>
                              <th className="px-4 py-2 border">Số tiền</th>
                              <th className="px-4 py-2 border">Phương thức</th>
                              <th className="px-4 py-2 border">Trạng thái</th>
                              <th className="px-4 py-2 border">
                                Ngày thanh toán
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {selectedOrder.PhieuThanhToans?.map((pt) => (
                              <tr
                                key={pt.Id}
                                className="hover:bg-gray-50 transition"
                              >
                                <td className="px-2 py-1 border">{pt.Id}</td>
                                <td className="px-2 py-1 border">
                                  {Number(pt.SoTien).toLocaleString()} đ
                                </td>
                                <td className="px-2 py-1 border">
                                  {pt.PhuongThuc}
                                </td>
                                <td className="px-2 py-1 border">
                                  {pt.TrangThai}
                                </td>
                                <td className="px-2 py-1 border">
                                  {new Date(pt.NgayThanhToan).toLocaleString()}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>

                        {/* Phiếu bảo hành */}
                        <h3 className="text-xl font-semibold mb-2">
                          Phiếu bảo hành
                        </h3>
                        <table className="min-w-full border border-gray-200 mb-4">
                          <thead className="bg-gray-100">
                            <tr>
                              <th className="px-4 py-2 border">ID</th>
                              <th className="px-4 py-2 border">Sản phẩm</th>
                              <th className="px-4 py-2 border">Trạng thái</th>
                              <th className="px-4 py-2 border">Ngày gửi</th>
                            </tr>
                          </thead>
                          <tbody>
                            {selectedOrder.PhieuBaoHanhs?.map((ph) => {
                              const sp = selectedOrder.ChiTietDonHangs.find(
                                (ct) => ct.SanPhamId === ph.SanPhamId
                              )?.BienTheSanPham?.SanPham;
                              return (
                                <tr
                                  key={ph.Id}
                                  className="hover:bg-gray-50 transition"
                                >
                                  <td className="px-2 py-1 border">{ph.Id}</td>
                                  <td className="px-2 py-1 border">
                                    {sp?.Ten || "Sản phẩm"}
                                  </td>
                                  <td className="px-2 py-1 border">
                                    {ph.TrangThai}
                                  </td>
                                  <td className="px-2 py-1 border">
                                    {new Date(ph.NgayGui).toLocaleString()}
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
