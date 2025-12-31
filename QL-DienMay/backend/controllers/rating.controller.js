const RatingService = require("../services/rating.service");

class RatingController {
  static async create(req, res) {
    try {
      const KhachHangId = req.user.userId; // giả sử đã có middleware xác thực user
      const { SanPhamId, SoSao, NoiDung } = req.body;
      const rating = await RatingService.createRating({ KhachHangId, SanPhamId, SoSao, NoiDung });
      res.status(201).json({ success: true, data: rating });
    } catch (err) {
      res.status(400).json({ success: false, message: err.message });
    }
  }

  static async getByProduct(req, res) {
    try {
      const { productId } = req.params;
      const ratings = await RatingService.getRatingsByProduct(productId);
      res.json({ success: true, data: ratings });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  }
}

module.exports = RatingController;
