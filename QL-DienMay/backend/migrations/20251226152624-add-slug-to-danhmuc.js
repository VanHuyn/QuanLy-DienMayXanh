"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("DanhMuc", "Slug", {
      type: Sequelize.STRING(255),
      allowNull: true, // tạm cho phép null
      unique: true,
    });
  },

  async down(queryInterface) {
    await queryInterface.removeColumn("DanhMuc", "Slug");
  },
};
