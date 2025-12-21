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



const app = express();
const PORT = 5000;

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));


app.use("/api/v1/users", userRoute);
app.use("/api/v1/roles", roleRoute);
app.use("/api/v1/auth", authRoute);
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


app.use("/api/v1/uploads", express.static("uploads"));

// Kết nối database
KetNoiCsdl();


app.listen(PORT, () => {
  console.log(`Server is running at PORT ${PORT}`);
});
