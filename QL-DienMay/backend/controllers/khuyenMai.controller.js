const KhuyenMaiService = require("../services/khuyenMai.service");

class KhuyenMaiController {
  // POST /api/khuyen-mai
  static async create(req, res) {
    try {
      const khuyenMai = await KhuyenMaiService.create(req.body);
      res.status(201).json({
        success: true,
        data: khuyenMai,
      });
    } catch (err) {
      res.status(400).json({
        success: false,
        message: err.message,
      });
    }
  }

  // GET /api/khuyen-mai
  static async getAll(req, res) {
    try {
      const { active } = req.query;
      const list = await KhuyenMaiService.getAll({
        active: active === "true",
      });

      res.json({
        success: true,
        data: list,
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: err.message,
      });
    }
  }

  // GET /api/khuyen-mai/:id
  static async getById(req, res) {
    try {
      const khuyenMai = await KhuyenMaiService.getById(req.params.id);
      res.json({
        success: true,
        data: khuyenMai,
      });
    } catch (err) {
      res.status(404).json({
        success: false,
        message: err.message,
      });
    }
  }

  // PUT /api/khuyen-mai/:id
  static async update(req, res) {
    try {
      const khuyenMai = await KhuyenMaiService.update(
        req.params.id,
        req.body
      );
      res.json({
        success: true,
        data: khuyenMai,
      });
    } catch (err) {
      res.status(400).json({
        success: false,
        message: err.message,
      });
    }
  }

  // DELETE /api/khuyen-mai/:id
  static async delete(req, res) {
    try {
      await KhuyenMaiService.delete(req.params.id);
      res.json({
        success: true,
        message: "Deleted successfully",
      });
    } catch (err) {
      res.status(400).json({
        success: false,
        message: err.message,
      });
    }
  }
  static async checkCode(req, res) {
  try {
    const { code } = req.params;
    const khuyenMai = await KhuyenMaiService.checkCode(code);

    res.json({
      success: true,
      data: khuyenMai,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
}
}

module.exports = KhuyenMaiController;
