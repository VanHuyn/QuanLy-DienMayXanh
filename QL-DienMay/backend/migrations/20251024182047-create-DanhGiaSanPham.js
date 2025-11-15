'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('DanhGiaSanPham', {
      Id: {
        type: Sequelize.BIGINT.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      SanPhamId: {
        type: Sequelize.BIGINT.UNSIGNED,
        allowNull: false,
        references: {
          model: 'SanPham',
          key: 'Id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        comment: 'FK → Sản phẩm được đánh giá',
      },
      KhachHangId: {
        type: Sequelize.BIGINT.UNSIGNED,
        allowNull: false,
        references: {
          model: 'KhachHang',
          key: 'Id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        comment: 'FK → Khách hàng viết đánh giá',
      },
      SoSao: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        comment: 'Số sao đánh giá (1–5)',
      },
      NoiDung: {
        type: Sequelize.TEXT,
        allowNull: true,
        comment: 'Nội dung đánh giá chi tiết',
      },
      Ngay: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        comment: 'Ngày viết đánh giá',
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal(
          'CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'
        ),
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('DanhGiaSanPham');
  },
};
