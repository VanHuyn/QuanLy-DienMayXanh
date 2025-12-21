const BranchWarehouseService = require("../services/branchWarehouse.service");

class BranchWarehouseController {
  async getAll(req, res) {
    try {
      const data = await BranchWarehouseService.getAll();
      res.json(data);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  async getById(req, res) {
    try {
      const data = await BranchWarehouseService.getById(req.params.id);
      if (!data)
        return res
          .status(404)
          .json({ message: "Branch warehouse not found" });

      res.json(data);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  async create(req, res) {
    try {
      const { ChiNhanhId, Ten } = req.body;

      if (!ChiNhanhId || !Ten) {
        return res
          .status(400)
          .json({ message: "BranchId and Name are required" });
      }

      const data = await BranchWarehouseService.create(req.body);
      res.status(201).json(data);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  async update(req, res) {
    try {
      const data = await BranchWarehouseService.update(
        req.params.id,
        req.body
      );
      res.json(data);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }

  async delete(req, res) {
    try {
      await BranchWarehouseService.delete(req.params.id);
      res.json({ message: "Branch warehouse deleted successfully" });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }
}

module.exports = new BranchWarehouseController();
