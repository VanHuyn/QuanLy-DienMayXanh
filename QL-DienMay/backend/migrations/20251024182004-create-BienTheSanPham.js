'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('BienTheSanPham', {
      Id: {
        type: Sequelize.BIGINT.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
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
        onDelete: 'CASCADE', // Nếu sản phẩm bị xóa thì các biến thể cũng bị xóa
      },
      Ten: {
        type: Sequelize.STRING(200),
        allowNull: true,
        comment: 'Tên biến thể (ví dụ: Màu đỏ, Size M, ...)',
      },
      Gia: {
        type: Sequelize.DECIMAL(15, 2),
        allowNull: true,
        comment: 'Giá riêng của biến thể (nếu khác với sản phẩm gốc)',
      },
      SoLuongTon: {
        type: Sequelize.INTEGER.UNSIGNED,
        defaultValue: 0,
        comment: 'Số lượng tồn kho của biến thể này',
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
    await queryInterface.dropTable('BienTheSanPham');
  },
};
