// DonHang.js
// Model Sequelize cho bảng DonHang
// Đơn hàng

module.exports = (sequelize, DataTypes) => {
  const DonHang = sequelize.define(
    "DonHang",
    {
      Id: {
        type: DataTypes.BIGINT.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
      },
      Ma: { type: DataTypes.STRING(100), allowNull: true, unique: true },
      KhachHangId: { type: DataTypes.BIGINT.UNSIGNED, allowNull: true },
      ChiNhanhId: { type: DataTypes.BIGINT.UNSIGNED, allowNull: true },
      TinhThanh: { type: DataTypes.STRING(100), allowNull: true },
      QuanHuyen: { type: DataTypes.STRING(100), allowNull: true },
      XaPhuong: { type: DataTypes.STRING(100), allowNull: true },
      DiaChiChiTiet: { type: DataTypes.STRING(500), allowNull: true },
      MoTa: { type: DataTypes.TEXT, allowNull: true },
      NhanVienId: { type: DataTypes.BIGINT.UNSIGNED, allowNull: true },
      // 
      DiaChiGiao: { type: DataTypes.STRING(500), allowNull: true },
      
      TongTien: { type: DataTypes.DECIMAL(15, 2), defaultValue: 0 },
      // 
      PhiVanChuyen: { type: DataTypes.DECIMAL(15, 2), defaultValue: 0 },
      PhuongThucThanhToan: { type: DataTypes.STRING(100), allowNull: true },
      TrangThai: {
        type: DataTypes.ENUM("ChoXacNhan", "DangGiao", "DaHoanTat", "DaHuy"),
        defaultValue: "ChoXacNhan",
      },
      NgayDat: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    },
    { tableName: "DonHang", timestamps: true }
  );

  DonHang.associate = (models) => {
    DonHang.belongsTo(models.KhachHang, {
      foreignKey: "KhachHangId",
      as: "KhachHang",
    });
    DonHang.belongsTo(models.ChiNhanh, {
      foreignKey: "ChiNhanhId",
      as: "ChiNhanh",
    });
    DonHang.belongsTo(models.NhanVien, {
      foreignKey: "NhanVienId",
      as: "NguoiXuLy",
    });
    DonHang.hasMany(models.ChiTietDonHang, {
      foreignKey: "DonHangId",
      as: "ChiTietDonHangs",
    });
    DonHang.hasMany(models.PhieuBaoHanh, {
      foreignKey: "DonHangId",
      as: "PhieuBaoHanhs",
    });
    DonHang.hasMany(models.PhieuDoiTra, {
      foreignKey: "DonHangId",
      as: "PhieuDoiTras",
    });
    DonHang.hasMany(models.PhieuThanhToan, {
      foreignKey: "DonHangId",
      as: "PhieuThanhToans",
    });
    DonHang.belongsToMany(models.BienTheSanPham, {
      through: models.ChiTietDonHang,
      foreignKey: "DonHangId",
      as: "BienTheSanPhams",
    });
  };

  return DonHang;
};
