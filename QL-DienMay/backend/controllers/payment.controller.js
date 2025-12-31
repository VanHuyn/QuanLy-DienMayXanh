const crypto = require("crypto");
const axios = require("axios");
const http = require("http");
const https = require("https");
const OrderService = require("../services/order.service");

const partnerCode = "MOMO";
const accessKey = "F8BBA842ECF85";
const secretKey = "K951B6PE1waDMi640xX08PD3vg6EkVlz";

const ipnUrl =
  "https://c42f99fddc31.ngrok-free.app/api/v1/payment/momo/callback";

const redirectUrl = "http://localhost:5173/thanh-toan-thanh-cong";

const momoEndpoint = "https://test-payment.momo.vn/v2/gateway/api/create";

const axiosInstance = axios.create({
  timeout: 8000,
  httpAgent: new http.Agent({ keepAlive: true }),
  httpsAgent: new https.Agent({ keepAlive: true }),
});

const verifyMomoSignature = (data) => {
  const {
    amount,
    extraData,
    message,
    orderId,
    orderInfo,
    orderType,
    partnerCode,
    payType,
    requestId,
    responseTime,
    resultCode,
    transId,
    signature,
  } = data;

  const rawSignature =
    `accessKey=${accessKey}` +
    `&amount=${amount}` +
    `&extraData=${extraData}` +
    `&message=${message}` +
    `&orderId=${orderId}` +
    `&orderInfo=${orderInfo}` +
    `&orderType=${orderType}` +
    `&partnerCode=${partnerCode}` +
    `&payType=${payType}` +
    `&requestId=${requestId}` +
    `&responseTime=${responseTime}` +
    `&resultCode=${resultCode}` +
    `&transId=${transId}`;

  const expectedSignature = crypto
    .createHmac("sha256", secretKey)
    .update(rawSignature)
    .digest("hex");

  console.log("🔐 RawSignature:", rawSignature);
  console.log("🔐 Expected:", expectedSignature);
  console.log("🔐 MoMo:", signature);

  return expectedSignature === signature;
};

const createPayment = async (req, res) => {
  try {
    const {
      DonHangId,
      TongTien,
      customer,
      ChiNhanhId,
      TinhThanh,
      QuanHuyen,
      XaPhuong,
      DiaChiChiTiet,
      products,
    } = req.body;

    if (!DonHangId || !TongTien || !ChiNhanhId || !products?.length) {
      return res.status(400).json({
        success: false,
        message: "Thiếu dữ liệu thanh toán MoMo",
      });
    }

    const amount = Math.floor(Number(TongTien));
    if (isNaN(amount) || amount < 1000) {
      return res.status(400).json({
        success: false,
        message: "Số tiền không hợp lệ",
      });
    }

    const orderId = `MOMO-${DonHangId}-${Date.now()}`;
    const requestId = `REQ-${Date.now()}`;
    const requestType = "captureWallet";
    const orderInfo = `Thanh toán đơn hàng #${DonHangId}`;

    const extraData = Buffer.from(
      JSON.stringify({
        DonHangId,
        KhachHangId: customer?.KhachHangId || null,
        ChiNhanhId,
        TinhThanh,
        QuanHuyen,
        XaPhuong,
        DiaChiChiTiet,
        items: products.map((p) => ({
          BienTheSanPhamId: p.BienTheSanPhamId,
          SoLuong: p.SoLuong,
        })),
      })
    ).toString("base64");

    const rawSignature =
      `accessKey=${accessKey}` +
      `&amount=${amount}` +
      `&extraData=${extraData}` +
      `&ipnUrl=${ipnUrl}` +
      `&orderId=${orderId}` +
      `&orderInfo=${orderInfo}` +
      `&partnerCode=${partnerCode}` +
      `&redirectUrl=${redirectUrl}` +
      `&requestId=${requestId}` +
      `&requestType=${requestType}`;

    const signature = crypto
      .createHmac("sha256", secretKey)
      .update(rawSignature)
      .digest("hex");

    const momoRes = await axiosInstance.post(momoEndpoint, {
      partnerCode,
      accessKey,
      requestId,
      amount,
      orderId,
      orderInfo,
      redirectUrl,
      ipnUrl,
      requestType,
      extraData,
      signature,
      lang: "vi",
    });

    if (momoRes.data.resultCode !== 0) {
      return res.status(400).json({
        success: false,
        message: momoRes.data.localMessage,
      });
    }

    return res.json({
      success: true,
      payUrl: momoRes.data.payUrl,
      orderId,
    });
  } catch (err) {
    console.error("❌ createPayment error:", err);
    return res.status(500).json({
      success: false,
      message: "Lỗi tạo thanh toán MoMo",
    });
  }
};

const callback = async (req, res) => {
  try {
    const data = req.body;
    console.log("📩 MoMo callback:", data);

    if (!verifyMomoSignature(data)) {
      console.error(" Sai signature");
      return res.status(400).send("Invalid signature");
    }

    if (data.resultCode !== 0) {
      console.warn(" Thanh toán thất bại:", data.message);
      return res.status(200).send("OK");
    }

    const extra = JSON.parse(
      Buffer.from(data.extraData, "base64").toString("utf8")
    );

    await OrderService.createOrder({
      KhachHangId: extra.KhachHangId,
      ChiNhanhId: extra.ChiNhanhId,
      TinhThanh: extra.TinhThanh,
      QuanHuyen: extra.QuanHuyen,
      XaPhuong: extra.XaPhuong,
      DiaChiChiTiet: extra.DiaChiChiTiet,
      MoTa: "Thanh toán MoMo",
      PhuongThucThanhToan: "momo",
      TongTien: Number(data.amount),
      items: extra.items.map((i) => ({
        bienTheSanPhamId: i.BienTheSanPhamId,
        soLuong: i.SoLuong,
      })),
    });

    console.log(" Đã lưu đơn hàng MoMo");
    return res.status(200).send("OK");
  } catch (err) {
    console.error(" Callback error:", err);
    return res.status(500).send("ERROR");
  }
};

module.exports = {
  createPayment,
  callback,
};
