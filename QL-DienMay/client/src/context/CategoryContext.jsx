import { createContext, useContext, useEffect, useState } from "react";
import categoryService from "../services/categoryService";
import toast from "react-hot-toast";

const CategoryContext = createContext();
export const useCategories = () => useContext(CategoryContext);

export const CategoryProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  // GET ALL
  const fetchCategories = async () => {
    try {
      setLoading(true);
      const res = await categoryService.getAll();
      setCategories(res.data || []);
    } catch (err) {
      toast.error("Không thể tải danh mục");
    } finally {
      setLoading(false);
    }
  };

  // CREATE
  const createCategory = async (data) => {
    try {
      const res = await categoryService.create(data);
      toast.success(res.message || "Thêm danh mục thành công");
      fetchCategories();
    } catch (err) {
      toast.error("Lỗi khi thêm danh mục");
    }
  };

  // UPDATE
  const updateCategory = async (id, data) => {
    try {
      const res = await categoryService.update(id, data);
      toast.success(res.message || "Cập nhật danh mục thành công");
      fetchCategories();
    } catch (err) {
      toast.error("Lỗi khi cập nhật danh mục");
    }
  };

  // DELETE
  const deleteCategory = async (id) => {
    try {
      const res = await categoryService.delete(id);
      toast.success(res.message || "Xoá danh mục thành công");
      fetchCategories();
    } catch (err) {
      toast.error("Lỗi khi xoá danh mục");
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <CategoryContext.Provider
      value={{
        categories,
        loading,
        fetchCategories,
        createCategory,
        updateCategory,
        deleteCategory,
      }}
    >
      {children}
    </CategoryContext.Provider>
  );
};
