const jwt = require("jsonwebtoken");
const { NguoiDung, VaiTro,KhachHang } = require("../models");
const { comparePassword, hashPassword } = require("../utils/password");

class AuthService {
  async login(Email, MatKhau) {
    const user = await NguoiDung.findOne({
      where: { Email },
      include: [{ model: VaiTro, as: "VaiTro" }],
    });
    if (!user) throw new Error("Sai email hoặc mật khẩu");
    const isValid = await comparePassword(MatKhau, user.MatKhau);
    if (!isValid) throw new Error("Sai email hoặc mật khẩu");
    // Tạo JWT
    const token = jwt.sign(
      {
        userId: user.Id,
        role: user.VaiTro.Ten,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );
    return { user, token };
  }
  async register(data) {
    const { HoTen, Email, MatKhau, SoDienThoai, DiaChi } = data;
    // 1. Kiểm tra email tồn tại
    const existed = await NguoiDung.findOne({ where: { Email } });
    if (existed) {
      throw new Error("Email đã tồn tại");
    }
    // 2. Hash mật khẩu
    const hashed = await hashPassword(MatKhau);
    // 3. Lấy VaiTroId của khách hàng
    const role = await VaiTro.findOne({ where: { Ten: "KhachHang" } });
    if (!role) throw new Error("Vai trò KhachHang chưa được tạo trong DB");
    // 4. Tạo tài khoản người dùng
    const newUser = await NguoiDung.create({
      HoTen,
      Email,
      MatKhau: hashed,
      SoDienThoai,
      DiaChi,
      VaiTroId: role.Id,
    });
    // 5. Tạo bảng KhachHang tương ứng
    await KhachHang.create({ NguoiDungId: newUser.Id });
    // Trả về thông tin user
    return newUser;
  }
}

module.exports = new AuthService();
