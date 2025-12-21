import axios from "axios";

const API_URL = "http://localhost:5000/api/v1/product-variants";

const productVariantService = {
  getAll: async () => {
    const res = await axios.get(API_URL);
    return res.data;
  },
  getById: async (id) => {
    const res = await axios.get(`${API_URL}/${id}`);
    return res.data;
  },
};

export default productVariantService;
