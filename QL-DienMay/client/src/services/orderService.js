import axios from "axios";

const API_URL = "http://localhost:5000/api/v1/orders"; // backend URL

const orderService = {
  placeOrder: async (data) => {
    const res = await axios.post(`${API_URL}`, data, { withCredentials: true });
    return res.data;
  },

  getCustomerOrders: async (khachHangId) => {
    const res = await axios.get(`${API_URL}/customer/${khachHangId}`, { withCredentials: true });
    return res.data;
  },
};

export default orderService;
