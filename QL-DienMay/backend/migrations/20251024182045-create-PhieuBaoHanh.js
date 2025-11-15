'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('PhieuBaoHanh', {
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
        comment: 'FK → Đơn hàng liên quan (nếu có)',
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
        comment: 'FK → Khách hàng gửi bảo hành',
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
        comment: 'FK → Sản phẩm được bảo hành',
      },
      NgayGui: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        comment: 'Ngày khách gửi yêu cầu bảo hành',
      },
      TrangThai: {
        type: Sequelize.ENUM('Moi', 'DangXuLy', 'DaHoanThanh'),
        allowNull: false,
        defaultValue: 'Moi',
        comment: 'Trạng thái xử lý phiếu bảo hành',
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
    await queryInterface.dropTable('PhieuBaoHanh');
  },
};
