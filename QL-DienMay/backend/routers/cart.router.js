// routes/cartRouter.js
const express = require('express');
const router = express.Router();
const CartController = require('../controllers/cart.controller');
const auth = require('../middleware/auth'); // JWT từ cookie

// Tất cả route giỏ hàng cần đăng nhập
router.use(auth);

// Lấy giỏ hàng
router.get('/', CartController.getCart);

// Thêm sản phẩm
router.post('/add', CartController.addItem);

// Cập nhật số lượng
router.put('/update/:id', CartController.updateItem);

// Xóa sản phẩm
router.delete('/remove/:id', CartController.removeItem);

// Xóa toàn bộ giỏ hàng
router.delete('/clear', CartController.clearCart);

module.exports = router;
