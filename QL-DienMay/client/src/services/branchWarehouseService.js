import axios from "axios";

const API_URL = "http://localhost:5000/api/v1/branch-warehouses";

const branchWarehouseService = {
  // Lấy tất cả kho chi nhánh
  getAll: async () => {
    const res = await axios.get(API_URL, { withCredentials: true });
    return res.data;
  },

  // Lấy chi tiết kho chi nhánh theo Id
  getById: async (id) => {
    const res = await axios.get(`${API_URL}/${id}`, { withCredentials: true });
    return res.data;
  },

  // Tạo mới kho chi nhánh
  create: async (data) => {
    const res = await axios.post(API_URL, data, { withCredentials: true });
    return res.data;
  },

  // Cập nhật kho chi nhánh
  update: async (id, data) => {
    const res = await axios.put(`${API_URL}/${id}`, data, { withCredentials: true });
    return res.data;
  },

  // Xoá kho chi nhánh
  delete: async (id) => {
    // Trả về dữ liệu kho bị xoá để hiển thị modal nếu cần
    const res = await axios.delete(`${API_URL}/${id}`, { withCredentials: true });
    return res.data;
  },
};

export default branchWarehouseService;
