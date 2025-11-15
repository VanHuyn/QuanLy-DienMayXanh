import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import KetNoiCsdl from "./config/KetNoiCsdl.js";


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





// Kết nối database
KetNoiCsdl();


app.listen(PORT, () => {
  console.log(`Server is running at PORT ${PORT}`);
});
