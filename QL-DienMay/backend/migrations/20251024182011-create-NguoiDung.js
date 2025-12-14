'use strict';

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
      },
      Email: {
        type: Sequelize.STRING(200),
        allowNull: false,
        unique: true,
        comment: 'Email đăng nhập',
      },
      MatKhau: {
        type: Sequelize.STRING(255),
        allowNull: false, // BẮT BUỘC CÓ MẬT KHẨU
        comment: 'Mật khẩu đã hash',
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
        references: {
          model: 'VaiTro',
          key: 'Id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT',
      },

      TrangThai: {
        type: Sequelize.ENUM('Active', 'Inactive', 'Locked'),
        allowNull: false,
        defaultValue: 'Active',
      },

      RefreshToken: {
        type: Sequelize.STRING(500),
        allowNull: true,
        comment: 'Lưu JWT refresh token để login không cần nhập lại',
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
    await queryInterface.dropTable('NguoiDung');
  },
};
