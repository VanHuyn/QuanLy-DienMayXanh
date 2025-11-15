'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('PhieuThanhToan', {
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
        onDelete: 'CASCADE', // Xóa đơn hàng thì xóa luôn phiếu thanh toán
        comment: 'FK -> DonHang',
      },
      SoTien: {
        type: Sequelize.DECIMAL(15, 2),
        allowNull: false,
        defaultValue: 0,
        comment: 'Số tiền thanh toán',
      },
      PhuongThuc: {
        type: Sequelize.STRING(100),
        allowNull: true,
        comment: 'Phương thức thanh toán (tiền mặt, chuyển khoản, v.v.)',
      },
      NgayThanhToan: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        comment: 'Ngày thanh toán',
      },
      TrangThai: {
        type: Sequelize.ENUM('ThanhCong', 'ThatBai', 'DangCho'),
        allowNull: false,
        defaultValue: 'DangCho',
        comment: 'Trạng thái thanh toán',
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
    await queryInterface.dropTable('PhieuThanhToan');
  },
};
