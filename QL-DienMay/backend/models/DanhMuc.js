
const slugify = require("slugify");

module.exports = (sequelize, DataTypes) => {
  const DanhMuc = sequelize.define(
    "DanhMuc",
    {
      Id: {
        type: DataTypes.BIGINT.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
      },
      Slug: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true,
      },
      Ten: { type: DataTypes.STRING(200), allowNull: false },
      MoTa: { type: DataTypes.TEXT, allowNull: true },
    },
    {
      tableName: "DanhMuc",
      timestamps: true,
      hooks: {
        beforeCreate(danhMuc) {
          danhMuc.Slug = slugify(danhMuc.Ten, {
            lower: true,
            strict: true,
            locale: "vi",
          });
        },

        beforeUpdate(danhMuc) {
          if (danhMuc.changed("Ten")) {
            danhMuc.Slug = slugify(danhMuc.Ten, {
              lower: true,
              strict: true,
              locale: "vi",
            });
          }
        },
      },
    }
  );
  const models = sequelize.models;
  try {
    if (models.SanPham)
      DanhMuc.hasMany(models.SanPham, {
        foreignKey: "DanhMucId",
        as: "SanPhams",
      });
  } catch (e) {
    // Có thể chưa đăng ký model khác; gọi lại associate từ code khởi tạo nếu cần
  }

  return DanhMuc;
};
