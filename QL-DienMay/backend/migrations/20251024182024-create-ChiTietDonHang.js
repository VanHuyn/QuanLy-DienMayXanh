"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("ChiTietDonHang", {
      Id: {
        type: Sequelize.BIGINT.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
      },

      DonHangId: {
        type: Sequelize.BIGINT.UNSIGNED,
        allowNull: false,
        references: {
          model: "DonHang",
          key: "Id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
        comment: "FK -> DonHang",
      },

      BienTheSanPhamId: {
        type: Sequelize.BIGINT.UNSIGNED,
        allowNull: true, // FIXED: phải allow NULL nếu onDelete SET NULL
        references: {
          model: "BienTheSanPham",
          key: "Id",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
        comment: "FK -> Biến thể sản phẩm",
      },

      SanPhamId: {
        type: Sequelize.BIGINT.UNSIGNED,
        allowNull: false,
        references: {
          model: "SanPham",
          key: "Id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
        comment: "FK -> Sản phẩm",
      },

      SoLuong: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        defaultValue: 1,
        comment: "Số lượng mua",
      },

      DonGia: {
        type: Sequelize.DECIMAL(15, 2),
        allowNull: false,
        defaultValue: 0,
        comment: "Đơn giá tại thời điểm mua",
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
    await queryInterface.dropTable("ChiTietDonHang");
  },
};
