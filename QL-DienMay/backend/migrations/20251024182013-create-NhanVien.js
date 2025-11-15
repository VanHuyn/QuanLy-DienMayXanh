'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('NhanVien', {
      Id: {
        type: Sequelize.BIGINT.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
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
        onDelete: 'CASCADE',
      },
      ChiNhanhId: {
        type: Sequelize.BIGINT.UNSIGNED,
        allowNull: true,
        comment: 'FK -> ChiNhanh',
        references: {
          model: 'ChiNhanh',
          key: 'Id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      MaNhanVien: {
        type: Sequelize.STRING(50),
        allowNull: true,
        unique: true,
        comment: 'Mã nhân viên',
      },
      ChucVu: {
        type: Sequelize.ENUM(
          'QuanLy',
          'NhanVienBanHang',
          'NhanVienKhoTong',
          'NhanVienKhoChiNhanh'
        ),
        allowNull: true,
        comment: 'Chức vụ cụ thể trong hệ thống',
      },
      NgayTuyenDung: {
        type: Sequelize.DATE,
        allowNull: true,
        comment: 'Ngày tuyển dụng',
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
    await queryInterface.dropTable('NhanVien');
  },
};
