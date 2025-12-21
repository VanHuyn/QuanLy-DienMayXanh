import axios from "axios";

const API_URL = "http://localhost:5000/api/v1/branches";

const branchService = {
  getAll: async () => {
    const res = await axios.get(API_URL, { withCredentials: true });
    return res.data;
  },

  create: async (data) => {
    const res = await axios.post(API_URL, data, {
      withCredentials: true,
    });
    return res.data;
  },

  update: async (id, data) => {
    const res = await axios.put(`${API_URL}/${id}`, data, {
      withCredentials: true,
    });
    return res.data;
  },

  delete: async (id) => {
    const res = await axios.delete(`${API_URL}/${id}`, {
      withCredentials: true,
    });
    return res.data;
  },
};

export default branchService;
