'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('KhoChiNhanh', {
      Id: {
        type: Sequelize.BIGINT.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      ChiNhanhId: {
        type: Sequelize.BIGINT.UNSIGNED,
        allowNull: false,
        comment: 'Khóa ngoại đến bảng ChiNhanh',
        references: {
          model: 'ChiNhanh',
          key: 'Id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      Ten: {
        type: Sequelize.STRING(255),
        allowNull: true,
        comment: 'Tên kho chi nhánh',
      },
      DiaChi: {
        type: Sequelize.STRING(500),
        allowNull: true,
        comment: 'Địa chỉ kho chi nhánh',
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
    await queryInterface.dropTable('KhoChiNhanh');
  },
};
