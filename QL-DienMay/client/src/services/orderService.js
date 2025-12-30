import axios from "axios";

const API_URL = "http://localhost:5000/api/v1/orders"; // backend URL
const API_PAYMENT_URL = "http://localhost:5000/api/v1/payment/momo";
const orderService = {
  placeOrder: async (data) => {
    const res = await axios.post(`${API_URL}`, data, { withCredentials: true });
    return res.data;
  },
   payWithMomo: async (orderData) => {
    const res = await axios.post(`${API_PAYMENT_URL}/create`, orderData, {
      withCredentials: true,
    });
    return res.data;
  },
  getCustomerOrders: async (khachHangId) => {
    const res = await axios.get(`${API_URL}/customer/${khachHangId}`, {
      withCredentials: true,
    });
    return res.data;
  },
  getAllOrders: async () => {
    const res = await axios.get(`${API_URL}/admin-order`, {
      withCredentials: true,
    });
    return res.data;
  },

  getOrderDetail: async (orderId) => {
    const res = await axios.get(`${API_URL}/admin-order/${orderId}`, {
      withCredentials: true,
    });
    return res.data;
  },

  updateOrderStatus: async (orderId, data) => {
    const res = await axios.patch(
      `${API_URL}/admin-order/${orderId}/status`,
      data,
      { withCredentials: true }
    );
    return res.data;
  },
};

export default orderService;
