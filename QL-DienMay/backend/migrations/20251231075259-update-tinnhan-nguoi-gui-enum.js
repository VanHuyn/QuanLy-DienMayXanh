'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // 1️⃣ Update dữ liệu cũ: đổi 'NhanVien' thành 'NhanVienBanHang'
    await queryInterface.sequelize.query(`
      UPDATE TinNhan 
      SET NguoiGui = 'NhanVienBanHang' 
      WHERE NguoiGui = 'NhanVien';
    `);

    // 2️⃣ Thay đổi ENUM của cột NguoiGui
    await queryInterface.changeColumn('TinNhan', 'NguoiGui', {
      type: Sequelize.ENUM('NhanVienBanHang', 'KhachHang'),
      allowNull: false,
    });
  },

  async down(queryInterface, Sequelize) {
    // Rollback: đổi lại dữ liệu và ENUM
    await queryInterface.sequelize.query(`
      UPDATE TinNhan 
      SET NguoiGui = 'NhanVien' 
      WHERE NguoiGui = 'NhanVienBanHang';
    `);

    await queryInterface.changeColumn('TinNhan', 'NguoiGui', {
      type: Sequelize.ENUM('NhanVien', 'KhachHang'),
      allowNull: false,
    });
  }
};
