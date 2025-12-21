import axios from "axios";

const API = "http://localhost:5000/api/v1/supplier-import-details";

export default {
  getByPhieu: (id) => axios.get(`${API}/${id}`).then(r => r.data),
  create: (id, data) => axios.post(`${API}/${id}`, data),
  remove: (id) => axios.delete(`${API}/detail/${id}`),
};  