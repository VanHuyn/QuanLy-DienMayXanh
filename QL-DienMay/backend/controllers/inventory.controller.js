const InventoryService = require("../services/inventory.service");

const InventoryController = {
  getAll: async (req, res) => {
    try {
      const data = await InventoryService.getAll();
      res.json(data);
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
  },
};

module.exports = InventoryController;
