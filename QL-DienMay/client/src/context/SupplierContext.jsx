import { createContext, useContext, useEffect, useState } from "react";
import supplierService from "../services/supplierService";
import toast from "react-hot-toast";

const SupplierContext = createContext();
export const useSuppliers = () => useContext(SupplierContext);

export const SupplierProvider = ({ children }) => {
  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(false);

  // GET ALL
  const fetchSuppliers = async () => {
    try {
      setLoading(true);
      const res = await supplierService.getAll();
      setSuppliers(res.data || []);
    } catch (err) {
      toast.error("Không thể tải danh sách nhà cung cấp");
    } finally {
      setLoading(false);
    }
  };

  // CREATE
  const createSupplier = async (data) => {
    try {
      const res = await supplierService.create(data);
      toast.success(res.message || "Thêm nhà cung cấp thành công");
      fetchSuppliers();
    } catch (err) {
      toast.error("Lỗi khi thêm nhà cung cấp");
    }
  };

  // UPDATE
  const updateSupplier = async (id, data) => {
    try {
      const res = await supplierService.update(id, data);
      toast.success(res.message || "Cập nhật nhà cung cấp thành công");
      fetchSuppliers();
    } catch (err) {
      toast.error("Lỗi khi cập nhật nhà cung cấp");
    }
  };

  // DELETE
  const deleteSupplier = async (id) => {
    try {
      const res = await supplierService.delete(id);
      toast.success(res.message || "Xoá nhà cung cấp thành công");
      fetchSuppliers();
    } catch (err) {
      toast.error("Lỗi khi xoá nhà cung cấp");
    }
  };

  useEffect(() => {
    fetchSuppliers();
  }, []);

  return (
    <SupplierContext.Provider
      value={{
        suppliers,
        loading,
        fetchSuppliers,
        createSupplier,
        updateSupplier,
        deleteSupplier,
      }}
    >
      {children}
    </SupplierContext.Provider>
  );
};
