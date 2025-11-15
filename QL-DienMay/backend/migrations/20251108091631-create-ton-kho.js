'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('TonKho', {
      Id: {
        type: Sequelize.BIGINT.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
      },
      BienTheSanPhamId: {
        type: Sequelize.BIGINT.UNSIGNED,
        allowNull: false,
        references: { model: 'BienTheSanPham', key: 'Id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      KhoTongId: {
        type: Sequelize.BIGINT.UNSIGNED,
        allowNull: true,
        references: { model: 'KhoTong', key: 'Id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      KhoChiNhanhId: {
        type: Sequelize.BIGINT.UNSIGNED,
        allowNull: true,
        references: { model: 'KhoChiNhanh', key: 'Id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      SoLuong: {
        type: Sequelize.INTEGER.UNSIGNED,
        defaultValue: 0,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('TonKho');
  }
};
