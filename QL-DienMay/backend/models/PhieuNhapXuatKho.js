// PhieuNhapXuatKho.js
// Model Sequelize cho bảng PhieuNhapXuatKho
// Phiếu nhập / xuất giữa KhoTong và KhoChiNhanh

module.exports = (sequelize, DataTypes) => {
  const PhieuNhapXuatKho = sequelize.define(
    "PhieuNhapXuatKho",
    {
      Id: {
        type: DataTypes.BIGINT.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
      },
      Loai: {
        type: DataTypes.ENUM("Nhap", "Xuat", "DieuChuyen"),
        allowNull: false,
      },
      NoiGui: {
        type: DataTypes.STRING(100),
        allowNull: true,
        comment: "ví dụ: KhoTong:1 hoặc ChiNhanh:2",
      },
      NoiNhan: { type: DataTypes.STRING(100), allowNull: true },
      NhanVienId: { type: DataTypes.BIGINT.UNSIGNED, allowNull: true },
      Ngay: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
      GhiChu: { type: DataTypes.TEXT, allowNull: true },
    },
    { tableName: "PhieuNhapXuatKho", timestamps: true }
  );

  // Thiết lập quan hệ (nếu models khác đã được đăng ký trong sequelize.models)
  PhieuNhapXuatKho.associate = (models) => {
    PhieuNhapXuatKho.belongsTo(models.NhanVien, {
      foreignKey: "NhanVienId",
      as: "NguoiThucHien",
    });
    PhieuNhapXuatKho.belongsTo(models.KhoTong, {
      foreignKey: "KhoTongId",
      as: "KhoTong",
    });
    PhieuNhapXuatKho.belongsTo(models.KhoChiNhanh, {
      foreignKey: "KhoChiNhanhId",
      as: "KhoChiNhanh",
    });
    PhieuNhapXuatKho.hasMany(models.ChiTietPhieuNhapXuatKho, {
      foreignKey: "PhieuNhapXuatKhoId",
      as: "ChiTietPhieuNXKs",
    });
  };

  return PhieuNhapXuatKho;
};
