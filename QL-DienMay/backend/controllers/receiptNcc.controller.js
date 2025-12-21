const ReceiptNccService = require("../services/receiptNcc.service");

const ReceiptNccController = {
  getAll: async (req, res) => {
    try {
      const data = await ReceiptNccService.getAll();
      res.json(data);
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
  },

  getById: async (req, res) => {
    try {
      const data = await ReceiptNccService.getById(req.params.id);
      res.json(data);
    } catch (e) {
      res.status(404).json({ message: e.message });
    }
  },

  create: async (req, res) => {
    try {
      const payload = {
        ...req.body,
        NhanVienId: req.user.userId,
      };
      const data = await ReceiptNccService.create(payload);
      res.status(201).json({
        message: "Tạo phiếu nhập NCC thành công",
        data,
      });
    } catch (e) {
      res.status(400).json({ message: e.message });
    }
  },

  confirm: async (req, res) => {
    try {
      await ReceiptNccService.confirm(req.params.id);
      res.json({ message: "Nhập kho thành công" });
    } catch (e) {
      res.status(400).json({ message: e.message });
    }
  },

  cancel: async (req, res) => {
    try {
      await ReceiptNccService.cancel(req.params.id);
      res.json({ message: "Huỷ phiếu thành công" });
    } catch (e) {
      res.status(400).json({ message: e.message });
    }
  },
};

module.exports = ReceiptNccController;
