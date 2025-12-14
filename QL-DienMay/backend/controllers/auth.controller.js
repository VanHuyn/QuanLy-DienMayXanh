const authService = require("../services/auth.service");

class AuthController {
  async login(req, res) {
    try {
      const { Email, MatKhau } = req.body;
      const result = await authService.login(Email, MatKhau);

      // Gửi token bằng cookie HTTP-Only
      res.cookie("token", result.token, {
        httpOnly: true, // Không đọc được bằng JS => chống XSS
        secure: false, // true nếu dùng HTTPS (production)
        sameSite: "lax",
        maxAge: 24 * 60 * 60 * 1000, // 1 ngày
      });

      return res.status(200).json({
        message: "Đăng nhập thành công",
        user: result.user,
      });
    } catch (err) {
      return res.status(400).json({ message: err.message });
    }
  }
  async register(req, res) {
    try {
      const user = await authService.register(req.body);

      return res.status(201).json({
        message: "Đăng ký thành công",
        user,
      });
    } catch (err) {
      return res.status(400).json({ message: err.message });
    }
  }
  async logout(req, res) {
    res.clearCookie("token");
    res.status(200).json({ message: "Đã đăng xuất" });
  }
}

module.exports = new AuthController();
