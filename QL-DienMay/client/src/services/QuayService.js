import axios from "axios";

const API_URL = "http://localhost:5000/api/v1/staff/sales";
const CUSTOMER_API = "http://localhost:5000/api/v1/customers";

export const QuayService = {
  sellAtQuay: async ({ items, PhuongThucThanhToan, MoTa, email }) => {
    let KhachHangId = null;

    if (email) {
      const resCheck = await axios.get(`${CUSTOMER_API}/check-email`, {
        params: { email },
      });
      if (resCheck.data.success && resCheck.data.data) {
        KhachHangId = resCheck.data.data.Id;
      }
    }

    const res = await axios.post(
      `${API_URL}/sell`,
      {
        items,
        PhuongThucThanhToan,
        MoTa,
        KhachHangId,
      },
      {
        withCredentials: true,
      }
    );

    return res.data.data;
  },
};
