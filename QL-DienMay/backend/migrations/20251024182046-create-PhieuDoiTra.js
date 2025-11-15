'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('PhieuDoiTra', {
      Id: {
        type: Sequelize.BIGINT.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      DonHangId: {
        type: Sequelize.BIGINT.UNSIGNED,
        allowNull: true,
        references: {
          model: 'DonHang',
          key: 'Id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        comment: 'FK → Đơn hàng gốc liên quan đến phiếu đổi/trả',
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
        comment: 'FK → Khách hàng yêu cầu đổi/trả',
      },
      LyDo: {
        type: Sequelize.STRING(500),
        allowNull: true,
        comment: 'Lý do đổi hoặc trả hàng',
      },
      Ngay: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        comment: 'Ngày lập phiếu đổi/trả',
      },
      TrangThai: {
        type: Sequelize.ENUM('ChoXuLy', 'DaXuLy', 'TuChoi'),
        allowNull: false,
        defaultValue: 'ChoXuLy',
        comment: 'Trạng thái xử lý phiếu',
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
    await queryInterface.dropTable('PhieuDoiTra');
  },
};
