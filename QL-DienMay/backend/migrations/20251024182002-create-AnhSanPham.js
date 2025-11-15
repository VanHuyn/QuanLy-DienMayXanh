'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('AnhSanPham', {
      Id: {
        type: Sequelize.BIGINT.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      SanPhamId: {
        type: Sequelize.BIGINT.UNSIGNED,
        allowNull: false,
        comment: 'Khóa ngoại đến bảng SanPham',
        references: {
          model: 'SanPham',
          key: 'Id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE', // nếu sản phẩm bị xóa thì ảnh cũng bị xóa
      },
      Url: {
        type: Sequelize.STRING(1000),
        allowNull: false,
        comment: 'Đường dẫn ảnh sản phẩm',
      },
      LaChinh: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        comment: 'Đánh dấu ảnh chính của sản phẩm',
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
    await queryInterface.dropTable('AnhSanPham');
  },
};
