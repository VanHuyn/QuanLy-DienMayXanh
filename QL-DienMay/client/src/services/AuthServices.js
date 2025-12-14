import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api/v1",
  withCredentials: true, // Quan trọng để gửi cookie token
});

class AuthService {
  async login(Email, MatKhau) {
    const res = await API.post("/auth/login", { Email, MatKhau });
    return res.data;
  }
  async register(data) {
    const res = await API.post("/auth/register", data);
    return res.data;
  }
  async logout() {
    const res = await API.post("/auth/logout");
    return res.data;
  }

  async getProfile() {
    const res = await API.get("/auth/profile");
    return res.data;
  }
}

export default new AuthService();
