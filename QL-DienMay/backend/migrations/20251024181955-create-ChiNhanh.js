'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ChiNhanh', {
      Id: {
        type: Sequelize.BIGINT.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      Ten: {
        type: Sequelize.STRING(255),
        allowNull: false,
        comment: 'Tên chi nhánh',
      },
      Ma: {
        type: Sequelize.STRING(50),
        allowNull: true,
        unique: true,
        comment: 'Mã định danh chi nhánh (nếu có)',
      },
      DiaChi: {
        type: Sequelize.STRING(500),
        allowNull: true,
        comment: 'Địa chỉ chi nhánh',
      },
      SoDienThoai: {
        type: Sequelize.STRING(50),
        allowNull: true,
        comment: 'Số điện thoại liên hệ chi nhánh',
      },
      Email: {
        type: Sequelize.STRING(200),
        allowNull: true,
        comment: 'Email chi nhánh (nếu có)',
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
    await queryInterface.dropTable('ChiNhanh');
  },
};
