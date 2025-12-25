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

exportKhoTongToChiNhanh: async (req, res) => {
  try {
    console.log("REQ BODY:", req.body);

    const { bienTheId, khoTongId, khoChiNhanhId, soLuong } = req.body;
    if (
      bienTheId == null ||
      khoTongId == null ||
      khoChiNhanhId == null ||
      soLuong == null
    ) {
      return res.status(400).json({ message: "Thiếu dữ liệu" });
    }

    const result =
      await InventoryService.exportFromKhoTongToChiNhanh({
        BienTheSanPhamId: Number(bienTheId),
        khoTongId: Number(khoTongId),
        khoChiNhanhId: Number(khoChiNhanhId),
        soLuong: Number(soLuong),
        nguoiDungId: req.user.Id,
      });

    res.json(result);
  } catch (e) {
    console.error(e);
    res.status(400).json({ message: e.message });
  }
},

};

module.exports = InventoryController;
