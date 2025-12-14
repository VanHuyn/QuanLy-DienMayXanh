const { NguoiDung, KhachHang, NhanVien, VaiTro } = require("../models");
const { hashPassword } = require("../utils/password");

class UserService {
  async createUser(data) {
    const { HoTen, Email, MatKhau, SoDienThoai, DiaChi, VaiTroId } = data;

    // 1. Kiểm tra email đã tồn tại
    const existed = await NguoiDung.findOne({ where: { Email } });
    if (existed) {
      throw new Error("Email đã tồn tại");
    }

    // 2. Hash mật khẩu ( mã hoá mật khẩu để bảo mật )
    const hashed = MatKhau ? await hashPassword(MatKhau) : null;

    // 3. Tạo NguoiDung
    const newUser = await NguoiDung.create({
      HoTen,
      Email,
      MatKhau: hashed,
      SoDienThoai,
      DiaChi,
      VaiTroId, 
    });

    // 4. Lấy thông tin role để quyết định tạo bảng con
    const role = await VaiTro.findByPk(VaiTroId);

    if (!role) throw new Error("Vai trò không tồn tại");

    // 5. Tạo bảng KhachHang hoặc NhanVien nếu cần
    if (role.Ten === "KhachHang") {
      await KhachHang.create({ NguoiDungId: newUser.Id });
    } 
    else if ([
        "QuanLy",
        "NhanVienBanHang",
        "NhanVienKhoTong",
        "NhanVienKhoChiNhanh"
      ].includes(role.Ten)) 
    {
      await NhanVien.create({
        NguoiDungId: newUser.Id,
        ChucVu: role.Ten
      });
    }

    return newUser;
  }


  // lấy tất cả người dùng
  async getAllUsers() {
    return await NguoiDung.findAll({
      include: [
        { model: VaiTro, as: "VaiTro" },
        { model: KhachHang, as: "KhachHang" },
        { model: NhanVien, as: "NhanVien" },
      ],
    });
  }

  // lấy người dùng theo id
  async getUserById(id) {
    const user = await NguoiDung.findByPk(id, {
      include: [
        { model: VaiTro, as: "VaiTro" },
        { model: KhachHang, as: "KhachHang" },
        { model: NhanVien, as: "NhanVien" },
      ],
    });
    if (!user) throw new Error("Không tìm thấy người dùng");
    return user;
  }

  // cập nhật người dùng
  async updateUser(id, data) {
    const user = await NguoiDung.findByPk(id);
    if (!user) throw new Error("Không tìm thấy người dùng");

    if (data.MatKhau) {
      data.MatKhau = await hashPassword(data.MatKhau);
    }

    await user.update(data);
    return user;
  }

  // xoá người dùng
  async deleteUser(id) {
    const user = await NguoiDung.findByPk(id);
    if (!user) throw new Error("Không tìm thấy người dùng");

    await user.destroy();
    return true;
  }
}

module.exports = new UserService();
