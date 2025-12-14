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
app.use("/api/v1/supplier", supplierRoute);

// Kết nối database
KetNoiCsdl();


app.listen(PORT, () => {
  console.log(`Server is running at PORT ${PORT}`);
});
