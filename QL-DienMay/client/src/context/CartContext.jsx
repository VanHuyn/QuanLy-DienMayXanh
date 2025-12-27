import { createContext, useContext, useEffect, useState } from "react";
import cartService from "../services/cartService";
import toast from "react-hot-toast";
import useAuth from "../hooks/useAuth";

const CartContext = createContext();
export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const fetchCart = async () => {
    if (!user) {
      setCart(null);
      return;
    }

    try {
      setLoading(true);
      const res = await cartService.getCart();
      setCart(res.data || null);
    } catch (err) {
      toast.error("Không thể tải giỏ hàng");
    } finally {
      setLoading(false);
    }
  };

  const addItem = async (data) => {
    try {
      const res = await cartService.addItem(data);
      toast.success(res.message || "Thêm sản phẩm thành công");
      fetchCart();
    } catch (err) {
      toast.error("Lỗi khi thêm sản phẩm");
    }
  };

  const updateItem = async (id, newQty) => {
    try {
      const res = await cartService.updateItem(id, newQty);
      toast.success(res.message || "Cập nhật sản phẩm thành công");
      fetchCart();
    } catch (err) {
      toast.error("Lỗi khi cập nhật sản phẩm");
    }
  };

  const removeItem = async (id) => {
    try {
      const res = await cartService.removeItem(id);
      toast.success(res.message || "Xoá sản phẩm thành công");
      fetchCart();
    } catch (err) {
      toast.error("Lỗi khi xoá sản phẩm");
    }
  };

  const clearCart = async () => {
    try {
      const res = await cartService.clearCart();
      toast.success(res.message || "Đã xoá toàn bộ giỏ hàng");
      fetchCart();
    } catch (err) {
      toast.error("Lỗi khi xoá giỏ hàng");
    }
  };

  useEffect(() => {
    fetchCart();
  }, [user]);

  return (
    <CartContext.Provider
      value={{
        cart,
        loading,
        fetchCart,
        addItem,
        updateItem,
        removeItem,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
