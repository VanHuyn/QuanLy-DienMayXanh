'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('KhachHang', {
      Id: {
        type: Sequelize.BIGINT.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
      },
      NguoiDungId: {
        type: Sequelize.BIGINT.UNSIGNED,
        allowNull: false,
        comment: 'FK -> NguoiDung',
        references: {
          model: 'NguoiDung',
          key: 'Id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE', // Xoá khách hàng khi tài khoản bị xoá
      },
      NgayDangKy: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      DiemTichLuy: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        defaultValue: 0,
        comment: 'Điểm tích lũy của khách hàng',
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
    await queryInterface.dropTable('KhachHang');
  },
};
