import axios from "axios";

const API_URL = "http://localhost:5000/api/v1/inventory";

const inventoryService = {
  // Lấy danh sách tồn kho
  getAll: async () => {
    const res = await axios.get(API_URL, {
      withCredentials: true,
    });
    return res.data;
  },

  // Kiểm kê & điều chỉnh tồn kho
  adjustInventory: async (data) => {
    const res = await axios.post(
      `${API_URL}-check`,
      data,
      { withCredentials: true }
    );
    return res.data;
  },

  // 🔥 XUẤT KHO CHO CHI NHÁNH
  exportToBranch: async (data) => {
    const res = await axios.post(
      `${API_URL}/export-kho-tong`,
      data,
      { withCredentials: true }
    );
    return res.data;
  },
};

export default inventoryService;
