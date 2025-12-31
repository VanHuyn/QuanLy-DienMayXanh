'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('CuocTroChuyen', {
      Id: {
        type: Sequelize.BIGINT.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      KhachHangId: {
        type: Sequelize.BIGINT.UNSIGNED,
        allowNull: true,
        references: { model: 'KhachHang', key: 'Id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      NhanVienId: {
        type: Sequelize.BIGINT.UNSIGNED,
        allowNull: true,
        references: { model: 'NhanVien', key: 'Id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
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
    await queryInterface.dropTable('CuocTroChuyen');
  },
};
