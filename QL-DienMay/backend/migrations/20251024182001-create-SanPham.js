"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("SanPham", {
      Id: {
        type: Sequelize.BIGINT.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      Ten: {
        type: Sequelize.STRING(300),
        allowNull: false,
        comment: "Tên sản phẩm",
      },
      SKU: {
        type: Sequelize.STRING(100),
        allowNull: true,
        unique: true,
        comment: "Mã SKU (Stock Keeping Unit)",
      },
      MoTa: {
        type: Sequelize.TEXT,
        allowNull: true,
        comment: "Mô tả sản phẩm",
      },
      Gia: {
        type: Sequelize.DECIMAL(15, 2),
        allowNull: false,
        defaultValue: 0,
        comment: "Giá bán sản phẩm",
      },
      DanhMucId: {
        type: Sequelize.BIGINT.UNSIGNED,
        allowNull: true,
        comment: "Khóa ngoại đến bảng DanhMuc",
        references: {
          model: "DanhMuc",
          key: "Id",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },
      TrangThai: {
        type: Sequelize.ENUM("DangBan", "TamNgung", "HetHang"),
        allowNull: false,
        defaultValue: "DangBan",
        comment: "Trạng thái kinh doanh của sản phẩm",
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal(
          "CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"
        ),
      },
    });
  },

  async down(queryInterface, Sequelize) {
    // Xóa ENUM trước khi drop table (tránh lỗi trên PostgreSQL)
    await queryInterface.dropTable("SanPham");
    await queryInterface.sequelize.query(
      'DROP TYPE IF EXISTS "enum_SanPham_TrangThai";'
    );
  },
};
