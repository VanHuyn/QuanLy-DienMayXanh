const {
  NguoiDung,
  KhachHang,
  NhanVien,
  VaiTro,
  ChiNhanh,
} = require("../models");

const { hashPassword } = require("../utils/password");
class UserService {
  async createUser(data) {
    const { HoTen, Email, MatKhau, SoDienThoai, DiaChi, VaiTroId, ChiNhanhId } =
      data;
    const existedUser = await NguoiDung.findOne({
      where: { Email },
    });
    if (existedUser) {
      throw new Error("Email đã tồn tại");
    }
    const role = await VaiTro.findByPk(VaiTroId);
    if (!role) {
      throw new Error("Vai trò không tồn tại");
    }
    const hashedPassword = MatKhau ? await hashPassword(MatKhau) : null;

    const newUser = await NguoiDung.create({
      HoTen,
      Email,
      MatKhau: hashedPassword,
      SoDienThoai,
      DiaChi,
      VaiTroId,
    });
    await this.handleCreateSubTable(newUser.Id, role.Ten, ChiNhanhId);

    return newUser;
  }
  async getAllUsers() {
    return await NguoiDung.findAll({
      include: [
        {
          model: VaiTro,
          as: "VaiTro",
        },
        {
          model: KhachHang,
          as: "KhachHang",
        },
        {
          model: NhanVien,
          as: "NhanVien",
          include: [
            {
              model: ChiNhanh,
              as: "ChiNhanh",
            },
          ],
        },
      ],
    });
  }
  async getUsersByBranch(chiNhanhId) {
    if (!chiNhanhId) {
      throw new Error("Thiếu chi nhánh");
    }

    return await NguoiDung.findAll({
      include: [
        {
          model: VaiTro,
          as: "VaiTro",
        },
        {
          model: NhanVien,
          as: "NhanVien",
          required: true,
          where: { ChiNhanhId: chiNhanhId },
          include: [
            {
              model: ChiNhanh,
              as: "ChiNhanh",
            },
          ],
        },
      ],
    });
  }

  async getUserById(id) {
    const user = await NguoiDung.findByPk(id, {
      include: [
        {
          model: VaiTro,
          as: "VaiTro",
        },
        {
          model: KhachHang,
          as: "KhachHang",
        },
        {
          model: NhanVien,
          as: "NhanVien",
          include: [
            {
              model: ChiNhanh,
              as: "ChiNhanh",
            },
          ],
        },
      ],
    });

    if (!user) {
      throw new Error("Không tìm thấy người dùng");
    }

    return user;
  }

  async updateUser(id, data) {
    const { HoTen, Email, MatKhau, SoDienThoai, DiaChi, VaiTroId, ChiNhanhId } =
      data;

    const user = await NguoiDung.findByPk(id);
    if (!user) {
      throw new Error("Không tìm thấy người dùng");
    }

    let updatedPassword = user.MatKhau;
    if (MatKhau) {
      updatedPassword = await hashPassword(MatKhau);
    }
    if (VaiTroId && VaiTroId !== user.VaiTroId) {
      const newRole = await VaiTro.findByPk(VaiTroId);
      if (!newRole) {
        throw new Error("Vai trò không tồn tại");
      }
      await KhachHang.destroy({
        where: { NguoiDungId: user.Id },
      });
      await NhanVien.destroy({
        where: { NguoiDungId: user.Id },
      });
      await this.handleCreateSubTable(user.Id, newRole.Ten, ChiNhanhId);
    }

    await user.update({
      HoTen,
      Email,
      MatKhau: updatedPassword,
      SoDienThoai,
      DiaChi,
      VaiTroId,
    });

    return user;
  }
  async updateProfile(userId, data) {
    const { HoTen, SoDienThoai, DiaChi } = data;
    const user = await NguoiDung.findByPk(userId);
    if (!user) throw new Error("Người dùng không tồn tại");

    await user.update({
      HoTen,
      SoDienThoai,
      DiaChi,
    });

    return user;
  }
  async deleteUser(id) {
    const user = await NguoiDung.findByPk(id);
    if (!user) {
      throw new Error("Không tìm thấy người dùng");
    }

    await KhachHang.destroy({
      where: { NguoiDungId: id },
    });
    await NhanVien.destroy({
      where: { NguoiDungId: id },
    });
    await user.destroy();
    return true;
  }

  //  HÀM DÙNG CHUNG XỬ LÝ BẢNG CON
  async handleCreateSubTable(nguoiDungId, roleName, chiNhanhId) {
    if (roleName === "KhachHang") {
      await KhachHang.create({
        NguoiDungId: nguoiDungId,
      });
      return;
    }
    const staffRoles = [
      "QuanLy",
      "NhanVienBanHang",
      "NhanVienKhoTong",
      "NhanVienKhoChiNhanh",
    ];

    if (staffRoles.includes(roleName)) {
      if (!chiNhanhId) {
        throw new Error("Vai trò này bắt buộc phải chọn chi nhánh");
      }

      await NhanVien.create({
        NguoiDungId: nguoiDungId,
        ChiNhanhId: chiNhanhId,
        ChucVu: roleName,
      });
    }
  }
}

module.exports = new UserService();
