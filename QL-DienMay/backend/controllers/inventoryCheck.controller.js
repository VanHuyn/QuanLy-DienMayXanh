// InventoryCheckController.js
const InventoryCheckService = require("../services/inventoryCheck.service");

exports.adjustInventory = async (req, res) => {
  try {
    await InventoryCheckService.adjust(req.body, req.user);
    res.json({ message: "Kiểm kê thành công" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
