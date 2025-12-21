import { createContext, useContext, useEffect, useState } from "react";
import supplierImportService from "../services/supplierImportService";
import toast from "react-hot-toast";

const SupplierImportContext = createContext();
export const useSupplierImports = () => useContext(SupplierImportContext);

export const SupplierImportProvider = ({ children }) => {
  const [imports, setImports] = useState([]);
  const [loading, setLoading] = useState(false);

  // LOAD LIST
  const fetchImports = async () => {
    try {
      setLoading(true);
      const res = await supplierImportService.getAll();
      setImports(res || []);
    } catch (e) {
      toast.error("Không thể tải phiếu nhập NCC");
    } finally {
      setLoading(false);
    }
  };

  // CREATE
  const createImport = async (data) => {
    try {
      await supplierImportService.create(data);
      toast.success("Tạo phiếu nhập thành công");
      fetchImports();
    } catch (e) {
      toast.error(e.response?.data?.message || "Lỗi tạo phiếu nhập");
    }
  };

  // CONFIRM NHẬP KHO
  const confirmImport = async (id) => {
    try {
      await supplierImportService.confirm(id);
      toast.success("Nhập kho thành công");
      fetchImports();
    } catch (e) {
      toast.error(e.response?.data?.message || "Không thể nhập kho");
    }
  };

  // HUỶ PHIẾU
  const cancelImport = async (id) => {
    try {
      await supplierImportService.cancel(id);
      toast.success("Huỷ phiếu thành công");
      fetchImports();
    } catch (e) {
      toast.error(e.response?.data?.message || "Không thể huỷ phiếu");
    }
  };

  useEffect(() => {
    fetchImports();
  }, []);

  return (
    <SupplierImportContext.Provider
      value={{
        imports,
        loading,
        fetchImports,
        createImport,
        confirmImport,
        cancelImport,
      }}
    >
      {children}
    </SupplierImportContext.Provider>
  );
};
