const express = require("express");
const router = express.Router();
const RatingController = require("../controllers/rating.controller");
const auth = require("../middleware/auth"); // middleware xác thực user

router.post("/", auth, RatingController.create); // đánh giá sản phẩm
router.get("/:productId", RatingController.getByProduct); // lấy danh sách đánh giá sản phẩm

module.exports = router;
