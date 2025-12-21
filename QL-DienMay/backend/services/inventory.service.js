const { TonKho } = require("../models");

const InventoryService = {
  getAll: async () => {
    return await TonKho.findAll({
      include: [
        {
          association: "BienThe",
          include: ["SanPham"],
        },
        "KhoTong",
        "KhoChiNhanh",
      ],
      order: [["updatedAt", "DESC"]],
    });
  },
};

module.exports = InventoryService;
