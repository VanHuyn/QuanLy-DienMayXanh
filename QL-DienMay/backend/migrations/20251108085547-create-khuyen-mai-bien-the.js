'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('KhuyenMaiBienTheSanPham', {
      Id: {
        type: Sequelize.BIGINT.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      KhuyenMaiId: {
        type: Sequelize.BIGINT.UNSIGNED,
        allowNull: false,
        references: {
          model: 'KhuyenMai',
          key: 'Id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      BienTheSanPhamId: {
        type: Sequelize.BIGINT.UNSIGNED,
        allowNull: false,
        references: {
          model: 'BienTheSanPham',
          key: 'Id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('NOW'),
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('NOW'),
      },
    });

    // Tạo unique index để tránh lặp KhuyenMaiId + BienTheSanPhamId
    await queryInterface.addConstraint('KhuyenMaiBienTheSanPham', {
      fields: ['KhuyenMaiId', 'BienTheSanPhamId'],
      type: 'unique',
      name: 'UK_KhuyenMai_BienThe'
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('KhuyenMaiBienTheSanPham');
  }
};
