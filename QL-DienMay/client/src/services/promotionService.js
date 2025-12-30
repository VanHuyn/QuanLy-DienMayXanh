import axios from "axios";

const API_URL = "http://localhost:5000/api/v1/promotion";

const promotionService = {
  // CREATE
  checkByCode(code) {
    return axios.get(`${API_URL}/code/${code}`);
  },
  createPromotion(data) {
    return axios.post(API_URL, data);
  },

  // GET ALL
  getPromotions(params = {}) {
    return axios.get(API_URL, { params });
  },

  // GET BY ID
  getPromotionById(id) {
    return axios.get(`${API_URL}/${id}`);
  },

  // UPDATE
  updatePromotion(id, data) {
    return axios.put(`${API_URL}/${id}`, data);
  },

  // DELETE
  deletePromotion(id) {
    return axios.delete(`${API_URL}/${id}`);
  },
};

export default promotionService;
