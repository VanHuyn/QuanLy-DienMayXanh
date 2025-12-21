import { createContext, useContext, useEffect, useState } from "react";
import productService from "../services/productService";
import toast from "react-hot-toast";

const ProductContext = createContext();
export const useProducts = () => useContext(ProductContext);

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  // GET ALL
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await productService.getAll();
      setProducts(res.data || []);
    } catch (err) {
      toast.error("Không thể tải danh sách sản phẩm");
    } finally {
      setLoading(false);
    }
  };

  // CREATE
  const createProduct = async (data) => {
    try {
      const res = await productService.create(data);
      toast.success(res.message || "Thêm sản phẩm thành công");
      fetchProducts();
    } catch (err) {
      toast.error("Lỗi khi thêm sản phẩm");
    }
  };

  // UPDATE
  const updateProduct = async (id, data) => {
    try {
      const res = await productService.update(id, data);
      toast.success(res.message || "Cập nhật sản phẩm thành công");
      fetchProducts();
    } catch (err) {
      toast.error("Lỗi khi cập nhật sản phẩm");
    }
  };

  // DELETE
  const deleteProduct = async (id) => {
    try {
      const res = await productService.delete(id);
      toast.success(res.message || "Xóa sản phẩm thành công");
      setProducts((prev) =>
      prev.filter((p) => p.Id !== id)
    );
    } catch (err) {
      toast.error("Lỗi khi xóa sản phẩm");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <ProductContext.Provider
      value={{
        products,
        loading,
        fetchProducts,
        createProduct,
        updateProduct,
        deleteProduct,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
