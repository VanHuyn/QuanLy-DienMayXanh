import axios from "axios";

const API_URL = "http://localhost:5000/api/v1/chat";

const chatService = {
  // Lấy danh sách cuộc trò chuyện
  getCuocTroChuyens: async () => {
    const res = await axios.get(`${API_URL}/cuoc-tro-chuyen`, { withCredentials: true });
    return res.data.data; // Lưu ý: backend trả res.data.data
  },
   getCuocTroChuyenKhach: async () => {
    const res = await axios.get(`${API_URL}/khach/cuoc-tro-chuyen`, { withCredentials: true });
    return res.data.data;
  },
  // Lấy tin nhắn theo cuộc trò chuyện
  getTinNhans: async (cuocTroChuyenId) => {
    const res = await axios.get(`${API_URL}/lay-tin-nhan/${cuocTroChuyenId}`, {
      withCredentials: true,
    });
    return res.data.data; // backend trả res.data.data
  },

  // Gửi tin nhắn
  sendTinNhan: async ({ CuocTroChuyenId, NoiDung }) => {
    const res = await axios.post(
      `${API_URL}/gui-tin-nhan`,
      { CuocTroChuyenId, NoiDung },
      { withCredentials: true }
    );
    return res.data.data;
  },

  // Tìm khách hàng theo số điện thoại
  timKhachHangTheoSDT: async (soDienThoai) => {
    const res = await axios.get(`${API_URL}/tim-khach-hang?soDienThoai=${encodeURIComponent(soDienThoai)}`, {
      withCredentials: true,
    });
    return res.data.data;
  },

  // Tạo hoặc lấy cuộc trò chuyện mới
  getOrCreateCuocTroChuyen: async ({ KhachHangId, NhanVienId }) => {
    const res = await axios.post(
      `${API_URL}/cuoc-tro-chuyen`,
      { KhachHangId, NhanVienId },
      { withCredentials: true }
    );
    return res.data.data;
  },
};

export default chatService;
