const express = require("express");
const router = express.Router();
const ChatController = require("../controllers/Chat.controller");
const auth = require("../middleware/auth");

// Tất cả route chat đều cần auth
router.use(auth);

// Lấy hoặc tạo cuộc trò chuyện
router.post("/cuoc-tro-chuyen", ChatController.getOrCreateCuocTroChuyen);
router.get("/cuoc-tro-chuyen", ChatController.layTatCaCuocTroChuyen);
router.get("/lay-tin-nhan/:CuocTroChuyenId", ChatController.layTinNhan);
router.get("/tim-khach-hang", ChatController.timKhachHangTheoSDT);
router.get("/khach/cuoc-tro-chuyen", ChatController.layCuocTroChuyenKhach);
// Gửi tin nhắn
router.post("/gui-tin-nhan", ChatController.guiTinNhan);

// Lấy tin nhắn theo cuộc trò chuyện
module.exports = router;
