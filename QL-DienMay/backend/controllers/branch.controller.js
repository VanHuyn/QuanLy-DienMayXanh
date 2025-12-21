const BranchService = require("../services/branch.service");

const BranchController = {
  // GET /branches
  getAll: async (req, res) => {
    try {
      const data = await BranchService.getAll();
      res.json(data);
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
  },

  // GET /branches/:id
  getById: async (req, res) => {
    try {
      const data = await BranchService.getById(req.params.id);
      if (!data) {
        return res.status(404).json({ message: "Chi nhánh không tồn tại" });
      }
      res.json(data);
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
  },

  // POST /branches
  create: async (req, res) => {
    try {
      const data = await BranchService.create(req.body);
      res.status(201).json({
        message: "Tạo chi nhánh thành công",
        data,
      });
    } catch (e) {
      res.status(400).json({ message: e.message });
    }
  },

  // PUT /branches/:id
  update: async (req, res) => {
    try {
      const data = await BranchService.update(req.params.id, req.body);
      res.json({
        message: "Cập nhật chi nhánh thành công",
        data,
      });
    } catch (e) {
      res.status(400).json({ message: e.message });
    }
  },

  // DELETE /branches/:id
  delete: async (req, res) => {
    try {
      await BranchService.delete(req.params.id);
      res.json({ message: "Xoá chi nhánh thành công" });
    } catch (e) {
      res.status(400).json({ message: e.message });
    }
  },
};

module.exports = BranchController;
