'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {

    // 1️⃣ Thêm KhoTongId
    await queryInterface.addColumn('PhieuNhapNCC', 'KhoTongId', {
      type: Sequelize.BIGINT.UNSIGNED,
      allowNull: false,
      after: 'NhaCungCapId',
    });

    // 2️⃣ Thêm NgayNhap
    await queryInterface.addColumn('PhieuNhapNCC', 'NgayNhap', {
      type: Sequelize.DATE,
      allowNull: true,
      after: 'NgayDat',
    });

    // 3️⃣ Thêm NhanVienId
    await queryInterface.addColumn('PhieuNhapNCC', 'NhanVienId', {
      type: Sequelize.BIGINT.UNSIGNED,
      allowNull: true,
      after: 'TrangThai',
    });

    // 4️⃣ (Khuyến nghị) thêm khóa ngoại
    await queryInterface.addConstraint('PhieuNhapNCC', {
      fields: ['KhoTongId'],
      type: 'foreign key',
      name: 'fk_phieunhapncc_khotong',
      references: {
        table: 'KhoTong',
        field: 'Id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'RESTRICT',
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint('PhieuNhapNCC', 'fk_phieunhapncc_khotong');

    await queryInterface.removeColumn('PhieuNhapNCC', 'NhanVienId');
    await queryInterface.removeColumn('PhieuNhapNCC', 'NgayNhap');
    await queryInterface.removeColumn('PhieuNhapNCC', 'KhoTongId');
  }
};
