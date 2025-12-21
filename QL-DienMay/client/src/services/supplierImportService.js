import axios from "axios";

const API_URL = "http://localhost:5000/api/v1/receipt";

// 🔥 Axios instance có gửi cookie
const axiosClient = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

const supplierImportService = {
  // Lấy danh sách phiếu nhập
  getAll: async () => {
    const res = await axiosClient.get("/");
    return res.data;
  },

  // Lấy chi tiết 1 phiếu
  getById: async (id) => {
    const res = await axiosClient.get(`/${id}`);
    return res.data;
  },

  // Tạo phiếu nhập NCC
  create: async (data) => {
    const res = await axiosClient.post("/", data);
    return res.data;
  },

  // Xác nhận nhập kho
  confirm: async (id) => {
    const res = await axiosClient.put(`/${id}/confirm`);
    return res.data;
  },

  // Huỷ phiếu
  cancel: async (id) => {
    const res = await axiosClient.put(`/${id}/cancel`);
    return res.data;
  },
};

export default supplierImportService;
