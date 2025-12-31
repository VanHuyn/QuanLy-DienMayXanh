import { useEffect, useState } from "react";
import { useOrder } from "../../context/OrderContext";
import toast from "react-hot-toast";

const statusColors = {
  ChoXacNhan: "bg-yellow-200 text-yellow-800",
  DangGiao: "bg-blue-200 text-blue-800",
  DaHoanTat: "bg-green-200 text-green-800",
  DaHuy: "bg-red-200 text-red-800",
};

export default function BranchManagerOrdersPage() {
  const { fetchBranchOrders, updateOrderStatus } = useOrder();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadOrders = async () => {
      try {
        setLoading(true);
        const res = await fetchBranchOrders();
        setOrders(res);
      } catch (err) {
        toast.error("Không tải được đơn hàng chi nhánh");
      } finally {
        setLoading(false);
      }
    };
    loadOrders();
  }, []);

  const handleChangeStatus = async (orderId, newStatus) => {
    try {
      await updateOrderStatus(orderId, newStatus);
      setOrders((prev) =>
        prev.map((o) => (o.Id === orderId ? { ...o, TrangThai: newStatus } : o))
      );
    } catch (err) {
      toast.error("Cập nhật trạng thái thất bại");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Đơn hàng chi nhánh</h1>
      {loading ? (
        <p>Đang tải...</p>
      ) : (
        <div className="overflow-x-auto shadow-md rounded-lg">
          <table className="min-w-full bg-white border border-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 border">ID</th>
                <th className="px-4 py-2 border">Khách hàng</th>
                <th className="px-4 py-2 border">Tổng tiền</th>
                <th className="px-4 py-2 border">Trạng thái</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.Id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-2 border">{order.Id}</td>
                  <td className="px-4 py-2 border">{order.KhachHang?.NguoiDung?.HoTen || "Khách vãng lai"}</td>
                  <td className="px-4 py-2 border">{Number(order.TongTien).toLocaleString()} đ</td>
                  <td className="px-4 py-2 border">
                    <select
                      value={order.TrangThai}
                      onChange={(e) => handleChangeStatus(order.Id, e.target.value)}
                      className={`px-2 py-1 rounded font-medium ${
                        statusColors[order.TrangThai] || "bg-gray-200 text-gray-800"
                      }`}
                    >
                      <option value="ChoXacNhan">Chờ xác nhận</option>
                      <option value="DangGiao">Đang xử lý</option>
                      <option value="DaHoanTat">Hoàn thành</option>
                      <option value="DaHuy">Hủy</option>
                    </select>
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
