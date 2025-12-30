const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  
  const token = req.cookies.token;  // Lấy token từ cookie
  if (!token) {
    return res.status(401).json({ message: "Chưa đăng nhập" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;  // Lưu thông tin user vào req
    next();
  } catch (err) {
    return res.status(401).json({ message: "Token không hợp lệ" });
  }
};
