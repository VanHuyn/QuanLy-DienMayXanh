'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('NhaCungCap', {
      Id: {
        type: Sequelize.BIGINT.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      Ten: {
        type: Sequelize.STRING(255),
        allowNull: false,
        comment: 'Tên nhà cung cấp',
      },
      DiaChi: {
        type: Sequelize.STRING(500),
        allowNull: true,
        comment: 'Địa chỉ nhà cung cấp',
      },
      SoDienThoai: {
        type: Sequelize.STRING(50),
        allowNull: true,
        comment: 'Số điện thoại liên hệ nhà cung cấp',
      },
      Email: {
        type: Sequelize.STRING(200),
        allowNull: true,
        comment: 'Email liên hệ của nhà cung cấp',
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
    await queryInterface.dropTable('NhaCungCap');
  },
};
