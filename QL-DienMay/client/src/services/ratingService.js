import axios from "axios";

const API_URL = "http://localhost:5000/api/v1/rating"; // endpoint backend

const RatingService = {
  // Tạo đánh giá
  create: async ({ SanPhamId, SoSao, NoiDung }) => {
    const res = await axios.post(API_URL, { SanPhamId, SoSao, NoiDung },{
      withCredentials: true,
    });
    return res.data;
  },

  // Lấy danh sách đánh giá theo sản phẩm
  getByProduct: async (productId) => {
    const res = await axios.get(`${API_URL}/${productId}`);
    return res.data;
  },
};

export default RatingService;
