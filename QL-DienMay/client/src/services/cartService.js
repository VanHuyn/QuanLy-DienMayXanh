import axios from "axios";

const API_URL = "http://localhost:5000/api/v1/cart"; // backend URL

const cartService = {
  getCart: async () => {
    const res = await axios.get(API_URL, { withCredentials: true });
    return res.data;
  },
  addItem: async (data) => {
    const res = await axios.post(`${API_URL}/add`, data, {
      withCredentials: true,
    });
    return res.data;
  },
  updateItem: async (id, quantity) => {
    const res = await axios.put(
      `${API_URL}/update/${id}`,
      { quantity },
      { withCredentials: true }
    );
    return res.data;
  },
  removeItem: async (id) => {
    const res = await axios.delete(`${API_URL}/remove/${id}`, {
      withCredentials: true,
    });
    return res.data;
  },
  clearCart: async () => {
    const res = await axios.delete(`${API_URL}/clear`, {
      withCredentials: true,
    });
    return res.data;
  },
};

export default cartService;
