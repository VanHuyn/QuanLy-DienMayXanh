import axios from "axios";

const API_BASE = "http://localhost:5000/api/v1/staff/invoice";

const InvoiceService = {
  // Lấy danh sách hóa đơn
  getInvoices: async (params) => {
    const res = await axios.get(API_BASE, {
      params,
      withCredentials: true, // gửi cookie đăng nhập
    });
    return res.data.data;
  },

  // Lấy chi tiết 1 hóa đơn
  getInvoiceById: async (id) => {
    const res = await axios.get(`${API_BASE}/${id}`, {
      withCredentials: true, // gửi cookie đăng nhập
    });
    return res.data.data;
  },
};

export default InvoiceService;
