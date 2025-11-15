'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ChiTietDonHang', {
      Id: {
        type: Sequelize.BIGINT.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
      },
      DonHangId: {
        type: Sequelize.BIGINT.UNSIGNED,
        allowNull: false,
        references: {
          model: 'DonHang',
          key: 'Id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE', // Nếu đơn hàng bị xóa thì xóa luôn chi tiết
        comment: 'FK -> DonHang',
      },
      BienTheSanPhamId: {
        type: Sequelize.BIGINT.UNSIGNED,
        allowNull: false,
        references: {
          model: 'BienTheSanPham',
          key: 'Id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL', // Nếu biến thể bị xóa thì giữ chi tiết nhưng null hóa FK
        comment: 'FK -> Biến thể sản phẩm',
      },
      SoLuong: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        defaultValue: 1,
        comment: 'Số lượng mua',
      },
      DonGia: {
        type: Sequelize.DECIMAL(15, 2),
        allowNull: false,
        defaultValue: 0,
        comment: 'Đơn giá tại thời điểm mua',
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
    await queryInterface.dropTable('ChiTietDonHang');
  },
};
