import { createContext, useContext, useEffect, useState } from "react";
import productVariantService from "../services/productVariantService";
import toast from "react-hot-toast";

const ProductVariantContext = createContext();
export const useProductVariants = () => useContext(ProductVariantContext);

export const ProductVariantProvider = ({ children }) => {
  const [variants, setVariants] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchVariants = async () => {
    try {
      setLoading(true);
      const res = await productVariantService.getAll();
      setVariants(res || []);
    } catch (err) {
      toast.error("Không thể tải danh sách biến thể sản phẩm");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVariants();
  }, []);

  return (
    <ProductVariantContext.Provider
      value={{
        variants,
        loading,
        fetchVariants,
      }}
    >
      {children}
    </ProductVariantContext.Provider>
  );
};
