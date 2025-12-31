// TinNhan.js
module.exports = (sequelize, DataTypes) => {
  const TinNhan = sequelize.define(
    "TinNhan",
    {
      Id: {
        type: DataTypes.BIGINT.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
      },
      CuocTroChuyenId: { type: DataTypes.BIGINT.UNSIGNED, allowNull: false },
      NguoiGui: { type: DataTypes.ENUM("NhanVienBanHang","KhachHang"), allowNull: false },
      NoiDung: { type: DataTypes.TEXT, allowNull: false },
      DaXem: { type: DataTypes.BOOLEAN, defaultValue: false },
    },
    { tableName: "TinNhan", timestamps: true }
  );

  TinNhan.associate = (models) => {
    TinNhan.belongsTo(models.CuocTroChuyen, { foreignKey: "CuocTroChuyenId", as: "CuocTroChuyen" });
  };

  return TinNhan;
};
