module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("DonHang", "TinhThanh", {
      type: Sequelize.STRING(100),
      allowNull: true,
    });
    await queryInterface.addColumn("DonHang", "QuanHuyen", {
      type: Sequelize.STRING(100),
      allowNull: true,
    });
    await queryInterface.addColumn("DonHang", "XaPhuong", {
      type: Sequelize.STRING(100),
      allowNull: true,
    });
    await queryInterface.addColumn("DonHang", "DiaChiChiTiet", {
      type: Sequelize.STRING(500),
      allowNull: true,
    });
    await queryInterface.addColumn("DonHang", "MoTa", {
      type: Sequelize.TEXT,
      allowNull: true,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("DonHang", "TinhThanh");
    await queryInterface.removeColumn("DonHang", "QuanHuyen");
    await queryInterface.removeColumn("DonHang", "XaPhuong");
    await queryInterface.removeColumn("DonHang", "DiaChiChiTiet");
    await queryInterface.removeColumn("DonHang", "MoTa");
  },
};
