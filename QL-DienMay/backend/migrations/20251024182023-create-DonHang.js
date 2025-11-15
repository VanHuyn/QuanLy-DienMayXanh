'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('DonHang', {
      Id: {
        type: Sequelize.BIGINT.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
      },
      Ma: {
        type: Sequelize.STRING(100),
        allowNull: true,
        unique: true,
        comment: 'Mã đơn hàng',
      },
      KhachHangId: {
        type: Sequelize.BIGINT.UNSIGNED,
        allowNull: true,
        references: {
          model: 'KhachHang',
          key: 'Id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        comment: 'FK -> KhachHang',
      },
      ChiNhanhId: {
        type: Sequelize.BIGINT.UNSIGNED,
        allowNull: true,
        references: {
          model: 'ChiNhanh',
          key: 'Id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        comment: 'FK -> ChiNhanh',
      },
      NhanVienId: {
        type: Sequelize.BIGINT.UNSIGNED,
        allowNull: true,
        references: {
          model: 'NhanVien',
          key: 'Id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        comment: 'FK -> NhanVien xử lý đơn hàng',
      },
      DiaChiGiao: {
        type: Sequelize.STRING(500),
        allowNull: true,
        comment: 'Địa chỉ giao hàng',
      },
      TongTien: {
        type: Sequelize.DECIMAL(15, 2),
        allowNull: false,
        defaultValue: 0,
        comment: 'Tổng tiền đơn hàng',
      },
      PhiVanChuyen: {
        type: Sequelize.DECIMAL(15, 2),
        allowNull: false,
        defaultValue: 0,
        comment: 'Phí vận chuyển',
      },
      PhuongThucThanhToan: {
        type: Sequelize.STRING(100),
        allowNull: true,
        comment: 'Phương thức thanh toán',
      },
      TrangThai: {
        type: Sequelize.ENUM('ChoXacNhan', 'DangGiao', 'DaHoanTat', 'DaHuy'),
        allowNull: false,
        defaultValue: 'ChoXacNhan',
        comment: 'Trạng thái đơn hàng',
      },
      NgayDat: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        comment: 'Ngày đặt hàng',
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
    await queryInterface.dropTable('DonHang');
  },
};
