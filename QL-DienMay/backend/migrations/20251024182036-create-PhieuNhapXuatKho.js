'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('PhieuNhapXuatKho', {
      Id: {
        type: Sequelize.BIGINT.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      Loai: {
        type: Sequelize.ENUM('Nhap', 'Xuat', 'DieuChuyen'),
        allowNull: false,
        comment: 'Loại phiếu: Nhập, Xuất, hoặc Điều chuyển',
      },
      NoiGui: {
        type: Sequelize.STRING(100),
        allowNull: true,
        comment: 'Ví dụ: KhoTong:1 hoặc ChiNhanh:2',
      },
      NoiNhan: {
        type: Sequelize.STRING(100),
        allowNull: true,
        comment: 'Ví dụ: KhoTong:1 hoặc ChiNhanh:2',
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
        comment: 'FK → NhanVien thực hiện phiếu',
      },
      Ngay: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        comment: 'Ngày lập phiếu',
      },
      GhiChu: {
        type: Sequelize.TEXT,
        allowNull: true,
        comment: 'Ghi chú thêm về phiếu nhập/xuất',
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
    await queryInterface.dropTable('PhieuNhapXuatKho');
  },
};
