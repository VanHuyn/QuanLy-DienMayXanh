// CuocTroChuyen.js
module.exports = (sequelize, DataTypes) => {
  const CuocTroChuyen = sequelize.define(
    "CuocTroChuyen",
    {
      Id: {
        type: DataTypes.BIGINT.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
      },
      KhachHangId: { type: DataTypes.BIGINT.UNSIGNED, allowNull: true }, // khách vãng lai có thể null
      NhanVienId: { type: DataTypes.BIGINT.UNSIGNED, allowNull: true },  // nhân viên phụ trách
    },
    { tableName: "CuocTroChuyen", timestamps: true }
  );

  CuocTroChuyen.associate = (models) => {
    CuocTroChuyen.belongsTo(models.KhachHang, { foreignKey: "KhachHangId", as: "KhachHang" });
    CuocTroChuyen.belongsTo(models.NhanVien, { foreignKey: "NhanVienId", as: "NhanVien" });
    CuocTroChuyen.hasMany(models.TinNhan, { foreignKey: "CuocTroChuyenId", as: "TinNhans" });
  };

  return CuocTroChuyen;
};
