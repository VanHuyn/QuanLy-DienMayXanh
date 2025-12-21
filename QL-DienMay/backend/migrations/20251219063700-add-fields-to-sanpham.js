'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await Promise.all([
      queryInterface.addColumn('SanPham', 'GiaKhuyenMai', {
        type: Sequelize.DECIMAL(15,2),
        allowNull: true,
      }),

      queryInterface.addColumn('SanPham', 'ThuongHieu', {
        type: Sequelize.STRING(150),
        allowNull: true,
      }),

      queryInterface.addColumn('SanPham', 'XuatXu', {
        type: Sequelize.STRING(150),
        allowNull: true,
      }),

      queryInterface.addColumn('SanPham', 'TrongLuong', {
        type: Sequelize.FLOAT,
        allowNull: true,
        comment: 'kg',
      }),

      queryInterface.addColumn('SanPham', 'KichThuoc', {
        type: Sequelize.STRING(150),
        allowNull: true,
        comment: 'DxRxC',
      }),

      queryInterface.addColumn('SanPham', 'AnhDaiDien', {
        type: Sequelize.STRING(500),
        allowNull: true,
      }),

      queryInterface.addColumn('SanPham', 'LuotXem', {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      }),
    ]);
  },

  async down(queryInterface) {
    await Promise.all([
      queryInterface.removeColumn('SanPham', 'GiaKhuyenMai'),
      queryInterface.removeColumn('SanPham', 'ThuongHieu'),
      queryInterface.removeColumn('SanPham', 'XuatXu'),
      queryInterface.removeColumn('SanPham', 'TrongLuong'),
      queryInterface.removeColumn('SanPham', 'KichThuoc'),
      queryInterface.removeColumn('SanPham', 'AnhDaiDien'),
      queryInterface.removeColumn('SanPham', 'LuotXem'),
    ]);
  },
};
