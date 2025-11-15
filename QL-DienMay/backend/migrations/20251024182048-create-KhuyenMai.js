'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('KhuyenMai', {
      Id: {
        type: Sequelize.BIGINT.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
      },
      Ma: {
        type: Sequelize.STRING(100),
        allowNull: true,
        unique: true,
        comment: 'Mã khuyến mãi (code riêng cho chiến dịch)',
      },
      Ten: {
        type: Sequelize.STRING(255),
        allowNull: false,
        comment: 'Tên chương trình khuyến mãi',
      },
      PhanTramGiam: {
        type: Sequelize.FLOAT,
        allowNull: true,
        comment: 'Phần trăm giảm giá (VD: 10 = giảm 10%)',
      },
      NgayBatDau: {
        type: Sequelize.DATE,
        allowNull: true,
        comment: 'Ngày bắt đầu áp dụng khuyến mãi',
      },
      NgayKetThuc: {
        type: Sequelize.DATE,
        allowNull: true,
        comment: 'Ngày kết thúc áp dụng khuyến mãi',
      },
      ApDungChoTatCa: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        comment: 'Nếu true → áp dụng cho toàn bộ sản phẩm',
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
    await queryInterface.dropTable('KhuyenMai');
  },
};
