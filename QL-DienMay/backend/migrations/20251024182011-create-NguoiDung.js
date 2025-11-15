'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('NguoiDung', {
      Id: {
        type: Sequelize.BIGINT.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
      },
      HoTen: {
        type: Sequelize.STRING(200),
        allowNull: false,
        comment: 'Họ và tên người dùng',
      },
      Email: {
        type: Sequelize.STRING(200),
        allowNull: false,
        unique: true,
        comment: 'Email đăng nhập duy nhất',
      },
      MatKhau: {
        type: Sequelize.STRING(255),
        allowNull: true,
        comment: 'Mật khẩu đã được mã hoá (hash)',
      },
      SoDienThoai: {
        type: Sequelize.STRING(50),
        allowNull: true,
      },
      DiaChi: {
        type: Sequelize.STRING(500),
        allowNull: true,
      },
      VaiTroId: {
        type: Sequelize.BIGINT.UNSIGNED,
        allowNull: false,
        comment: 'Khoá ngoại liên kết tới bảng VaiTro',
        references: {
          model: 'VaiTro',
          key: 'Id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT', // Không cho xoá vai trò nếu còn người dùng liên quan
      },
      TrangThai: {
        type: Sequelize.ENUM('Active', 'Inactive', 'Locked'),
        allowNull: false,
        defaultValue: 'Active',
        comment: 'Trạng thái tài khoản',
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'),
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('NguoiDung');
  },
};
