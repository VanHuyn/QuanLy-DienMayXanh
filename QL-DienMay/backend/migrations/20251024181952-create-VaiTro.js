'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('VaiTro', {
      Id: {
        type: Sequelize.BIGINT.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      Ten: {
        type: Sequelize.ENUM(
          'Admin',
          'QuanLy',
          'NhanVienBanHang',
          'NhanVienKhoTong',
          'NhanVienKhoChiNhanh',
          'KhachHang',
          'KhachVangLai'
        ),
        allowNull: false,
        unique: true,
        comment: 'Tên vai trò trong hệ thống',
      },
      MoTa: {
        type: Sequelize.TEXT,
        allowNull: true,
        comment: 'Mô tả chi tiết về vai trò',
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'),
      },
    });
  },

  async down(queryInterface, Sequelize) {
    // Xóa ENUM trước khi drop table (tránh lỗi trên MySQL / Postgres)
    await queryInterface.dropTable('VaiTro');
  },
};
