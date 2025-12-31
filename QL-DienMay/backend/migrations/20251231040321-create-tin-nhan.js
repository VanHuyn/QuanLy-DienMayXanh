'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('TinNhan', {
      Id: {
        type: Sequelize.BIGINT.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      CuocTroChuyenId: {
        type: Sequelize.BIGINT.UNSIGNED,
        allowNull: false,
        references: { model: 'CuocTroChuyen', key: 'Id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      NguoiGui: {
        type: Sequelize.ENUM('NhanVien','KhachHang'),
        allowNull: false,
      },
      NoiDung: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      DaXem: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW'),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW'),
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('TinNhan');
  },
};
