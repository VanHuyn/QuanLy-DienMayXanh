import axios from "axios";

const API_URL = "http://localhost:5000/api/v1/revenue";

export const RevenueService = {
  // Tổng doanh thu admin
  getAdminRevenue: async () => {
    const res = await axios.get(`${API_URL}/admin`);
    return res.data;
  },

  // Doanh thu chi nhánh theo id
  getBranchRevenue: async (branchId) => {
    const res = await axios.get(`${API_URL}/branch/${branchId}`);
    return res.data;
  },

  // Doanh thu tất cả chi nhánh
  getAllBranchesRevenue: async () => {
    const res = await axios.get(`${API_URL}/branches`);
    return res.data;
  },

  // Doanh thu theo ngày, có thể truyền branchId
  getDailyRevenue: async (branchId) => {
    const res = await axios.get(`${API_URL}/daily`, {
      params: branchId ? { branchId } : {},
    });
    return res.data;
  },
};
