import { createContext, useContext, useState } from "react";
import orderService from "../services/orderService";
import toast from "react-hot-toast";
import useAuth from "../hooks/useAuth";

const OrderContext = createContext();
export const useOrder = () => useContext(OrderContext);

export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  console.log(user);
  const fetchOrders = async () => {
    if (!user?.KhachHang?.Id) {
      setOrders([]);
      return;
    }
    try {
      setLoading(true);
      const res = await orderService.getCustomerOrders(user.KhachHang.Id);
      setOrders(res.data || []);
    } catch (err) {
      toast.error("Không thể tải đơn hàng");
    } finally {
      setLoading(false);
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

  return (
    <OrderContext.Provider
      value={{
        orders,
        loading,
        fetchOrders,
        placeOrder,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};
