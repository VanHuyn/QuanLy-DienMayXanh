import { createContext, useContext, useState } from "react";
import { QuayService } from "../services/QuayService";
import toast from "react-hot-toast";

const QuayContext = createContext();
export const useQuay = () => useContext(QuayContext);

export const QuayProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(false);

  // Thêm sản phẩm vào giỏ
  const addToCart = (item) => {
    const exist = cartItems.find(i => i.bienTheSanPhamId === item.bienTheSanPhamId);
    let newCart;
    if (exist) {
      // Cộng dồn số lượng nếu đã tồn tại
      newCart = cartItems.map(i =>
        i.bienTheSanPhamId === item.bienTheSanPhamId
          ? { ...i, soLuong: i.soLuong + item.soLuong }
          : i
      );
    } else {
      newCart = [...cartItems, item];
    }
    setCartItems(newCart);
    calculateTotal(newCart);
  };

  const removeFromCart = (bienTheSanPhamId) => {
    const newCart = cartItems.filter(i => i.bienTheSanPhamId !== bienTheSanPhamId);
    setCartItems(newCart);
    calculateTotal(newCart);
  };

  const updateQuantity = (bienTheSanPhamId, soLuong) => {
    const newCart = cartItems.map(i =>
      i.bienTheSanPhamId === bienTheSanPhamId ? { ...i, soLuong } : i
    );
    setCartItems(newCart);
    calculateTotal(newCart);
  };

  const calculateTotal = (cart) => {
    const t = cart.reduce((acc, item) => acc + item.GiaKhuyenMai * item.soLuong, 0);
    setTotal(t);
  };

  // Thanh toán tại quầy
  const sellAtQuay = async ({ PhuongThucThanhToan, MoTa, email }) => {
    if (!cartItems.length) return toast.error("Giỏ hàng trống");
    setLoading(true);
    try {
      const res = await QuayService.sellAtQuay({
        items: cartItems,
        PhuongThucThanhToan,
        MoTa,
        email,
      });
      setOrder(res.data);
      setCartItems([]);
      setTotal(0);
      toast.success("Bán hàng thành công!");
      return res.data;
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return (
    <QuayContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        total,
        sellAtQuay,
        order,
        loading,
        setCartItems,
        setTotal,
      }}
    >
      {children}
    </QuayContext.Provider>
  );
};
