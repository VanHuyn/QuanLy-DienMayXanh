// Ví dụ migration ChiTietPhieuNhapXuatKho
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ChiTietPhieuNhapXuatKho', {
      Id: { type: Sequelize.BIGINT.UNSIGNED, primaryKey: true, autoIncrement: true },
      PhieuNhapXuatKhoId: { type: Sequelize.BIGINT.UNSIGNED, allowNull: false },
      BienTheSanPhamId: { type: Sequelize.BIGINT.UNSIGNED, allowNull: false },
      SoLuong: { type: Sequelize.INTEGER.UNSIGNED, defaultValue: 0 },
      createdAt: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
      updatedAt: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('ChiTietPhieuNhapXuatKho');
  }
};
