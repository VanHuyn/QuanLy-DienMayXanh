import { createContext, useContext, useEffect, useState } from "react";
import productService from "../services/productService";
import toast from "react-hot-toast";

const ProductContext = createContext();
export const useProducts = () => useContext(ProductContext);

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [categoryProducts, setCategoryProducts] = useState([]);

  const [categorySlug, setCategorySlug] = useState(null);

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
  const fetchProductsByCategory = async (categoryId,branchIdFromParam) => {
    try {
      setLoading(true);
       const branchId = branchIdFromParam || sessionStorage.getItem("branchId");
      if (!branchId) {
        toast.error("Chưa chọn chi nhánh");
        return;
      }

      const res = await productService.getByCategory(categoryId, branchId);

      setCategoryProducts(res.data || []);
    } catch (err) {
      toast.error("Không thể tải sản phẩm theo danh mục");
    } finally {
      setLoading(false);
    }
  };
  const fetchProductsByCategorySlug = async (slug) => {
  try {
    setLoading(true);

    const branchId = sessionStorage.getItem("branchId");
    if (!branchId) {
      toast.error("Chưa chọn chi nhánh");
      return;
    }

    const res = await productService.getByCategorySlug(slug, branchId);
    const products = res?.data || [];
    console.log("pr ",products)
    setCategoryProducts(products); 
    setCategorySlug(slug);
  } catch (err) {
    toast.error("Không thể tải sản phẩm theo danh mục");
  } finally {
    setLoading(false);
  }
};

  // CREATE
  const createProduct = async (data) => {
    try {
      setActionLoading(true);
      const res = await productService.create(data);

      toast.success("Thêm sản phẩm thành công");
      setProducts((prev) => [res.data, ...prev]);
    } catch (err) {
      toast.error("Lỗi khi thêm sản phẩm");
    } finally {
      setActionLoading(false);
    }
  };

  // UPDATE
  const updateProduct = async (id, data) => {
    try {
      setActionLoading(true);
      const res = await productService.update(id, data);
      toast.success(res.message || "Cập nhật sản phẩm thành công");
      fetchProducts();
    } catch (err) {
      toast.error("Lỗi khi cập nhật sản phẩm");
    } finally {
      setActionLoading(false);
    }
  };
  const getProductById = async (id) => {
    try {
      setLoading(true);
      const res = await productService.getById(id);
      setCurrentProduct(res.data);
      return res;
    } catch (err) {
      toast.error("Không thể tải sản phẩm");
      return null;
    } finally {
      setLoading(false);
    }
  };

  // DELETE
  const deleteProduct = async (id) => {
    try {
      const res = await productService.delete(id);
      toast.success(res.message || "Xóa sản phẩm thành công");
      setProducts((prev) => prev.filter((p) => p.Id !== id));
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
        categoryProducts,
        currentProduct,
        categorySlug,
        fetchProductsByCategory,
        fetchProductsByCategorySlug,
        fetchProducts,
        createProduct,
        updateProduct,
        deleteProduct,
        getProductById,
        actionLoading,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
