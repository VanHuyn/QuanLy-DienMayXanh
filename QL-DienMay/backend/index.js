const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require('dotenv').config();
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const KetNoiCsdl = require("./config/KetNoiCsdl.js");
const roleRoute = require("./routers/role.route");
const userRoute = require("./routers/user.route.js");
const authRoute = require("./routers/auth.routes.js");
const categoryRoute = require("./routers/category.router.js");
const supplierRoute = require("./routers/supplier.router.js");
const branchtRoute = require("./routers/branch.router.js");
const productRoute = require("./routers/product.router.js");
const warehouseRoute = require("./routers/warehouse.router.js");
const receiptNccRoute = require("./routers/receiptNcc.router.js");
const supplierImportDetailRoute = require("./routers/supplierImportDetail.route.js");
const productVariantRoute = require("./routers/productVariant.router.js");
const inventoryRoute = require("./routers/inventory.route.js");
const inventoryCheckRouter = require("./routers/inventoryCheck.router.js");
const branchWarehouseRouter = require("./routers/branchWarehouse.router.js");
const cartRouter = require("./routers/cart.router.js");
const orderRouter = require("./routers/order.router.js");
const paymentRouter = require("./routers/payment.routes.js");
const khuyenMaiRouter = require("./routers/khuyenMai.route.js");
const ratingRouter = require("./routers/rating.router.js");
const revenueRouter = require("./routers/revenue.router.js");
const invoiceRoutes = require("./routers/invoice.route.js");
const staffSaleRouter = require("./routers/quay.router.js");
const customerRouter = require("./routers/customer.router.js");
const chatRouter = require("./routers/chat.router.js");
const { Server } = require("socket.io");
const http = require("http");
const ChatService = require("./services/Chat.service.js");


const app = express();
const PORT = 5000;

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));
const server = http.createServer(app);


app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));


app.use("/api/v1/users", userRoute);
app.use("/api/v1/roles", roleRoute);
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/customers", customerRouter);
app.use("/api/v1/categories", categoryRoute);
app.use("/api/v1/branches", branchtRoute);
app.use("/api/v1/branch-warehouses", branchWarehouseRouter);
app.use("/api/v1/suppliers", supplierRoute);
app.use("/api/v1/products", productRoute);
app.use("/api/v1/warehouse", warehouseRoute);
app.use("/api/v1/receipt", receiptNccRoute);
app.use("/api/v1/supplier-import-details", supplierImportDetailRoute);
app.use("/api/v1/product-variants", productVariantRoute);
app.use("/api/v1/inventory", inventoryRoute);
app.use("/api/v1/inventory-check", inventoryCheckRouter);
app.use('/api/v1/rating', ratingRouter);
app.use('/api/v1/cart', cartRouter);
app.use('/api/v1/orders', orderRouter);
app.use('/api/v1/payment', paymentRouter);
app.use('/api/v1/promotion', khuyenMaiRouter);
app.use("/api/v1/revenue", revenueRouter);
app.use("/api/v1/staff/invoice", invoiceRoutes);
app.use("/api/v1/staff/sales", staffSaleRouter);
app.use("/api/v1/uploads", express.static("uploads"));
app.use("/api/v1/chat", chatRouter);


const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("Người dùng kết nối:", socket.id);
  // Tham gia room theo cuộc trò chuyện
  socket.on("joinRoom", (cuocTroChuyenId) => {
    if (!cuocTroChuyenId) return;
    socket.join(`room_${cuocTroChuyenId}`);
    console.log(`Socket ${socket.id} joined room_${cuocTroChuyenId}`);
  });

  // Nhận tin nhắn từ client
  socket.on("sendMessage", async (data) => {
    try {
      const { CuocTroChuyenId, NoiDung, NguoiGui } = data;
      console.log("data ",data)
      if (!CuocTroChuyenId || !NoiDung || !NguoiGui) return;

      // Lưu tin nhắn vào DB với người gửi chính xác
      const tin = await ChatService.guiTinNhan({ CuocTroChuyenId, NoiDung, NguoiGui });
      if (!tin) return;

      // Emit realtime cho tất cả client trong room
      io.to(`room_${CuocTroChuyenId}`).emit("receiveMessage", tin);
      console.log("Tin nhắn gửi thành công:", tin.Id);
    } catch (err) {
      console.error("Lỗi gửi tin nhắn:", err.message);
    }
  });

  socket.on("disconnect", () => {
    console.log("Người dùng ngắt kết nối:", socket.id);
  });
});
// Kết nối database
KetNoiCsdl();


server.listen(PORT, () => {
  console.log(`Server is running at PORT ${PORT}`);
});