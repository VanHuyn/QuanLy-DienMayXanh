import { createContext, useContext, useState } from "react";
import promotionService from "../services/promotionService";
import toast from "react-hot-toast";

const PromotionContext = createContext();
export const usePromotion = () => useContext(PromotionContext);

export const PromotionProvider = ({ children }) => {
  const [promotion, setPromotion] = useState(null);
  const [promotions, setPromotions] = useState([]);
  const [discountPercent, setDiscountPercent] = useState(0);
  const [loading, setLoading] = useState(false);
  const fetchPromotions = async () => {
    try {
      setLoading(true);
      const res = await promotionService.getPromotions();
      setPromotions(res.data.data || []);
    } catch (err) {
      toast.error("Không tải được danh sách khuyến mãi");
    } finally {
      setLoading(false);
    }
  };
  const checkPromotionCode = async (code) => {
  try {
    setLoading(true);
    const res = await promotionService.checkByCode(code);

    if (!res.data.success) {
      setPromotion(null);
      setDiscountPercent(0);
      toast.error(res.data.message);
      return null;
    }

    setPromotion(res.data.data);
    setDiscountPercent(res.data.data.PhanTramGiam || 0);
    toast.success(`Giảm ${res.data.data.PhanTramGiam}%`);
    return res.data.data; 
  } catch (err) {
    toast.error("Không kiểm tra được mã khuyến mãi");
    return null;
  } finally {
    setLoading(false);
  }
};


  const clearPromotion = () => {
    setPromotion(null);
    setDiscountPercent(0);
  };

  return (
    <PromotionContext.Provider
      value={{
        promotion,
        promotions,
        discountPercent,
        loading,
        fetchPromotions,
        checkPromotionCode,
        clearPromotion,
      }}
    >
      {children}
    </PromotionContext.Provider>
  );
};
