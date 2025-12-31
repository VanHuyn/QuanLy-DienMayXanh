import { createContext, useContext, useState } from "react";
import orderService from "../services/orderService";
import toast from "react-hot-toast";
import useAuth from "../hooks/useAuth";

const OrderContext = createContext();
export const useOrder = () => useContext(OrderContext);

export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [adminOrders, setAdminOrders] = useState([]);
  const { user } = useAuth();
  console.log("aaa ",user)
  // ---------------- Khách hàng ----------------
  const fetchOrders = async () => {
    if (!user?.Id) {
      setOrders([]);
      return;
    }
    try {
      console.log("user.KhachHang.Id ",user.Id)
      setLoading(true);
      const res = await orderService.getCustomerOrders(user?.Id);
      setOrders(res.data || []);
    } catch (err) {
      toast.error("Không thể tải đơn hàng");
    } finally {
      setLoading(false);
    }
  };
   const fetchBranchOrders = async () => {
    try {
      setLoading(true);
      const res = await orderService.getBranchOrders();
      return res.data || [];
    } catch (err) {
      toast.error("Không thể tải đơn hàng chi nhánh");
      return [];
    } finally {
      setLoading(false);
    }
  };
  const payWithMomo = async (orderData) => {
  try {
    const res = await orderService.payWithMomo(orderData);
    if (res.success && res.payUrl) {
      window.location.href = res.payUrl;
    } else {
      toast.error("Không tạo được link thanh toán MoMo");
    }
  } catch (err) {
    console.error("Lỗi thanh toán MoMo:", err);
    toast.error(err.response?.data?.message || "Lỗi khi thanh toán MoMo");
    throw err;
  }
};
  const placeOrder = async (data) => {
    try {
      const res = await orderService.placeOrder(data);
      toast.success(res.message || "Đặt hàng thành công");
      fetchOrders();
      return res.data;
    } catch (err) {
      toast.error(err.response?.data?.message || "Lỗi khi đặt hàng");
      throw err;
    }
  };

  // ---------------- Admin ----------------
  const fetchAllOrders = async () => {
    try {
      setLoading(true);
      const res = await orderService.getAllOrders();
      setAdminOrders(res.data || []);
    } catch (err) {
      toast.error("Không thể tải danh sách đơn hàng");
    } finally {
      setLoading(false);
    }
  };

  const fetchOrderDetail = async (orderId) => {
    try {
      setLoading(true);
      const res = await orderService.getOrderDetail(orderId);
      return res.data;
    } catch (err) {
      toast.error("Không thể tải chi tiết đơn hàng");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // OrderContext.js
  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      const res = await orderService.updateOrderStatus(orderId, {
        TrangThai: newStatus,
      });
      toast.success("Cập nhật trạng thái thành công");
      fetchAllOrders();
      return res.data;
    } catch (err) {
      toast.error("Cập nhật trạng thái thất bại");
      throw err;
    }
  };

  return (
    <OrderContext.Provider
      value={{
        orders,
        adminOrders,
        loading,
        fetchOrders,
        placeOrder,
        fetchAllOrders,
        fetchOrderDetail,
        updateOrderStatus,
        payWithMomo,
        fetchBranchOrders
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};
