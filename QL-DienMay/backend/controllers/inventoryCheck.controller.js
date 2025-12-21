const InventoryCheckService = require("../services/inventoryCheck.service");

const InventoryCheckController = {
  adjust: async (req, res) => {
    try {
      const data = await InventoryCheckService.adjust(req.body, req.user);
      res.json({
        message: "Kiểm kê & điều chỉnh tồn kho thành công",
        data,
      });
    } catch (e) {
      res.status(400).json({ message: e.message });
    }
  },
};

module.exports = InventoryCheckController;
