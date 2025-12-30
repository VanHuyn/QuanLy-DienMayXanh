import React, { useEffect, useState, useContext, useMemo } from "react";
import { useCart } from "../../context/CartContext";
import { useOrder } from "../../context/OrderContext";
import Meta from "../../components/Meta";
import { FiTrash2, FiPlus, FiMinus } from "react-icons/fi";
import { AuthContext } from "../../context/AuthContext";
import toast from "react-hot-toast";
import { useBranches } from "../../context/BranchContext";
import { usePromotion } from "../../context/PromotionContext";
import { useNavigate } from "react-router-dom";
export default function CheckoutPage() {
  const navigate = useNavigate();
  const { cart, updateItem, removeItem, clearCart } = useCart();
  const { selectedBranch } = useBranches();
  const { checkPromotionCode, loading, promotions } = usePromotion();
  const [promotionCode, setPromotionCode] = useState("");
  const [appliedPromotion, setAppliedPromotion] = useState(null);
  const [showPromotions, setShowPromotions] = useState(false);

  const { placeOrder, payWithMomo } = useOrder();
  const { user } = useContext(AuthContext);
  const [localCart, setLocalCart] = useState([]);
  const [orderInfo, setOrderInfo] = useState({
    TinhThanh: "",
    QuanHuyen: "",
    XaPhuong: "",
    DiaChiChiTiet: "",
    MoTa: "",
    PhuongThucThanhToan: "cod",
  });
  console.log(user)
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const handleApplyPromotion = async () => {
    if (!promotionCode.trim()) {
      toast.error("Vui lòng nhập mã khuyến mãi");
      return;
    }

    const promo = await checkPromotionCode(promotionCode.trim());

    if (promo) {
      setAppliedPromotion(promo);
    }
  };

  useEffect(() => {
    if (cart?.ChiTietGioHangs) setLocalCart(cart.ChiTietGioHangs);
    fetchProvinces();
  }, [cart]);

  const fetchProvinces = async () => {
    const res = await fetch("https://provinces.open-api.vn/api/?depth=1");
    const data = await res.json();
    setProvinces(data);
  };

  const fetchDistricts = async (provinceCode) => {
    if (!provinceCode) return setDistricts([]);
    const res = await fetch(
      `https://provinces.open-api.vn/api/p/${provinceCode}?depth=2`
    );
    const data = await res.json();
    setDistricts(data.districts || []);
    setWards([]);
  };

  const fetchWards = async (districtCode) => {
    if (!districtCode) return setWards([]);
    const res = await fetch(
      `https://provinces.open-api.vn/api/d/${districtCode}?depth=2`
    );
    const data = await res.json();
    setWards(data.wards || []);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOrderInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleQtyChange = async (itemId, delta) => {
    const item = localCart.find((i) => i.Id === itemId);
    if (!item) return;
    const newQty = Math.max(item.SoLuong + delta, 1);
    setLocalCart((prev) =>
      prev.map((i) => (i.Id === itemId ? { ...i, SoLuong: newQty } : i))
    );
    await updateItem(itemId, newQty);
  };

  const handleRemove = async (itemId) => {
    setLocalCart((prev) => prev.filter((i) => i.Id !== itemId));
    await removeItem(itemId);
  };

  const handleClearCart = async () => {
    setLocalCart([]);
    await clearCart();
  };

  const subtotal = useMemo(() => {
    return localCart.reduce((sum, item) => {
      const product = item.BienTheSanPham;
      const price =
        product.GiaKhuyenMai && product.GiaKhuyenMai > 0
          ? Number(product.GiaKhuyenMai)
          : Number(product.Gia);
      return sum + price * item.SoLuong;
    }, 0);
  }, [localCart]);

  const discountPercent = useMemo(() => {
    return appliedPromotion ? Number(appliedPromotion.PhanTramGiam) : 0;
  }, [appliedPromotion]);

  const discountAmount = useMemo(() => {
    return (subtotal * discountPercent) / 100;
  }, [subtotal, discountPercent]);

  const totalPrice = useMemo(() => {
    return subtotal - discountAmount;
  }, [subtotal, discountAmount]);

  const handleSubmitOrder = async () => {
    if (!user) {
      toast.error("Bạn cần đăng nhập để đặt hàng");
      return;
    }
    if (localCart.length === 0) {
      toast.error("Giỏ hàng trống");
      return;
    }

    const orderData = {
      DonHangId: Date.now(), // ID tạm thời để MoMo nhận biết
      TongTien: totalPrice,
      KhachHangId: user?.Id,
      customer: { KhachHangId: user?.Id },
      ChiNhanhId: selectedBranch?.Id,
      MoTa: orderInfo.MoTa,
      TinhThanh: orderInfo.TinhThanh,
      QuanHuyen: orderInfo.QuanHuyen,
      XaPhuong: orderInfo.XaPhuong,
      DiaChiChiTiet: orderInfo.DiaChiChiTiet,
      products: localCart.map((item) => ({
        BienTheSanPhamId: item.BienTheSanPham.Id,
        SoLuong: item.SoLuong,
      })),
    };
    try {
      if (orderInfo.PhuongThucThanhToan === "cod") {
        const res = await placeOrder({
          ...orderData,
          PhuongThucThanhToan: "cod",
          ChiNhanhId: selectedBranch?.Id,
          items: localCart.map((item) => ({
            bienTheSanPhamId: item.BienTheSanPham.Id,
            soLuong: item.SoLuong,
          })),
        });
        setLocalCart([]);
        navigate("/thanh-toan-thanh-cong");
      } else if (orderInfo.PhuongThucThanhToan === "momo") {
        await payWithMomo({
          DonHangId: Date.now(),
          TongTien: totalPrice,
          customer: { KhachHangId: user.Id },
          ChiNhanhId: selectedBranch.Id,
          TinhThanh: orderInfo.TinhThanh,
          QuanHuyen: orderInfo.QuanHuyen,
          XaPhuong: orderInfo.XaPhuong,
          DiaChiChiTiet: orderInfo.DiaChiChiTiet,
          products: localCart.map((item) => ({
            BienTheSanPhamId: item.BienTheSanPham.Id,
            SoLuong: item.SoLuong,
          })),
        });
        if (res.success && res.payUrl) {
          window.location.href = res.payUrl; // redirect sang MoMo
        } else {
          toast.error("Không tạo được link thanh toán Momo");
        }
      }
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Đặt hàng thất bại!");
    }
  };

  if (!cart || localCart.length === 0)
    return (
      <div className="text-center py-20">
        <p className="text-gray-500 text-lg mb-6">
          Chưa có sản phẩm trong giỏ hàng.
        </p>
      </div>
    );

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <Meta title="Thanh toán" description="Trang thanh toán" />
      <h1 className="text-3xl font-bold mb-8 text-gray-900">Thanh toán</h1>
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Form thông tin giao hàng */}
        <div className="lg:w-7/12 bg-white rounded-2xl shadow p-6 flex flex-col gap-6 sticky top-6">
          <h2 className="font-bold text-2xl text-gray-900 mb-4">
            Thông tin giao hàng
          </h2>
          <div className="flex flex-col gap-2 bg-gray-50 p-3 rounded-lg">
            <p>
              <span className="font-semibold">Họ và tên: </span>
              {user?.HoTen || "-"}
            </p>
            <p>
              <span className="font-semibold">Số điện thoại: </span>
              {user?.SoDienThoai || "-"}
            </p>
          </div>
    
          <div className="flex flex-col gap-3">
            <select
              name="TinhThanh"
              value={orderInfo.TinhThanh}
              onChange={(e) => {
                const code = e.target.selectedOptions[0].dataset.code;
                setOrderInfo((prev) => ({
                  ...prev,
                  TinhThanh: e.target.value,
                  QuanHuyen: "",
                  XaPhuong: "",
                }));
                fetchDistricts(code);
              }}
              className="border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
            >
              <option value="">Chọn tỉnh/thành</option>
              {provinces.map((p) => (
                <option key={p.code} value={p.name} data-code={p.code}>
                  {p.name}
                </option>
              ))}
            </select>

            <select
              name="QuanHuyen"
              value={orderInfo.QuanHuyen}
              onChange={(e) => {
                const code = e.target.selectedOptions[0].dataset.code;
                setOrderInfo((prev) => ({
                  ...prev,
                  QuanHuyen: e.target.value,
                  XaPhuong: "",
                }));
                fetchWards(code);
              }}
              className="border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
            >
              <option value="">Chọn quận/huyện</option>
              {districts.map((d) => (
                <option key={d.code} value={d.name} data-code={d.code}>
                  {d.name}
                </option>
              ))}
            </select>

            <select
              name="XaPhuong"
              value={orderInfo.XaPhuong}
              onChange={(e) =>
                setOrderInfo((prev) => ({
                  ...prev,
                  XaPhuong: e.target.value,
                }))
              }
              className="border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
            >
              <option value="">Chọn xã/phường</option>
              {wards.map((w) => (
                <option key={w.code} value={w.name}>
                  {w.name}
                </option>
              ))}
            </select>

            <input
              type="text"
              name="DiaChiChiTiet"
              placeholder="Địa chỉ chi tiết"
              value={orderInfo.DiaChiChiTiet}
              onChange={handleChange}
              className="border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
            />

            <textarea
              name="MoTa"
              placeholder="Mô tả (tuỳ chọn)"
              value={orderInfo.MoTa}
              onChange={handleChange}
              className="border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
            />


            {/* Mã khuyến mãi */}
            <div className="flex gap-2 mt-3">
              <input
                type="text"
                placeholder="Nhập mã khuyến mãi"
                value={promotionCode}
                onChange={(e) => setPromotionCode(e.target.value)}
                className="flex-1 border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
              />
              <button
                onClick={handleApplyPromotion}
                disabled={loading}
                className="px-4 rounded-lg bg-green-500 hover:bg-green-600 text-white font-semibold disabled:opacity-50"
              >
                Áp dụng
              </button>
            </div>

            {appliedPromotion && (
              <p className="text-green-600 text-sm mt-1">
                Đã áp dụng mã <b>{appliedPromotion.Ma}</b> (-
                {appliedPromotion.PhanTramGiam}%)
              </p>
            )}

            <div className="flex gap-4 mt-2">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="PhuongThucThanhToan"
                  value="cod"
                  checked={orderInfo.PhuongThucThanhToan === "cod"}
                  onChange={handleChange}
                  className="accent-blue-500"
                />
                Thanh toán khi nhận hàng
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="PhuongThucThanhToan"
                  value="momo"
                  checked={orderInfo.PhuongThucThanhToan === "momo"}
                  onChange={handleChange}
                  className="accent-blue-500"
                />
                Thanh toán Momo
              </label>
            </div>

            <div className="border-t pt-4 text-lg">
              <div className="flex justify-between">
                <span>Tạm tính:</span>
                <span>{subtotal.toLocaleString()}₫</span>
              </div>

              {appliedPromotion && (
                <div className="flex justify-between text-green-600">
                  <span>Giảm giá:</span>
                  <span>-{discountAmount.toLocaleString()}₫</span>
                </div>
              )}

              <div className="flex justify-between font-bold text-red-600 mt-2">
                <span>Tổng thanh toán:</span>
                <span>{totalPrice.toLocaleString()}₫</span>
              </div>
            </div>

            <button
              onClick={handleSubmitOrder}
              className="w-full bg-linear-to-r from-indigo-500 to-blue-500 hover:from-indigo-600 hover:to-blue-600 text-white font-bold py-3 rounded-xl transition"
            >
              Thanh toán ngay
            </button>
          </div>
        </div>

        {/* Danh sách sản phẩm */}
        <div className="lg:w-5/12 flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold mb-4">Giỏ hàng của bạn</h2>
            <button
              onClick={handleClearCart}
              className="text-red-500 hover:text-red-600 font-semibold"
            >
              Xoá toàn bộ
            </button>
          </div>

          {localCart.map((item) => {
            const product = item.BienTheSanPham;
            const mainImage =
              product.SanPham.AnhSanPhams[0]?.Url || "/no-image.png";
            return (
              <div
                key={item.Id}
                className="flex items-center bg-white rounded-2xl shadow hover:shadow-lg p-4 gap-4 transition"
              >
                <img
                  src={mainImage}
                  alt={product.Ten}
                  className="w-24 h-24 object-contain rounded-lg"
                />
                <div className="flex-1">
                  <p className="font-semibold text-gray-900">{product.Ten}</p>
                  <p className="text-gray-500 text-sm">
                    {product.SanPham.ThuongHieu} | {product.SanPham.XuatXu}
                  </p>
                  <p className="text-red-600 font-bold mt-1">
                    {Number(product.Gia).toLocaleString()}₫
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() => handleQtyChange(item.Id, -1)}
                      className="w-8 h-8 flex items-center justify-center border rounded-lg hover:bg-gray-100"
                    >
                      <FiMinus />
                    </button>
                    <span className="px-2 font-semibold">{item.SoLuong}</span>
                    <button
                      onClick={() => handleQtyChange(item.Id, 1)}
                      className="w-8 h-8 flex items-center justify-center border rounded-lg hover:bg-gray-100"
                    >
                      <FiPlus />
                    </button>
                  </div>
                </div>
                <button
                  onClick={() => handleRemove(item.Id)}
                  className="text-red-500 hover:text-red-600 font-semibold"
                >
                  <FiTrash2 size={20} />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
