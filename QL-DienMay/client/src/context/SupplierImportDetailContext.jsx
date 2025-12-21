import { createContext, useContext, useState } from "react";
import supplierImportDetailService from "../services/supplierImportDetailService";
import toast from "react-hot-toast";

const SupplierImportDetailContext = createContext();
export const useSupplierImportDetails = () => useContext(SupplierImportDetailContext);

export const SupplierImportDetailProvider = ({ children }) => {
  const [details, setDetails] = useState([]);
  const [phieu, setPhieu] = useState(null);

  const fetchDetails = async (phieuNhapId) => {
    try {
      const data = await supplierImportDetailService.getByPhieu(phieuNhapId);
      setDetails(data.ChiTietPhieuNhaps || []);
      setPhieu(data); // lấy luôn phiếu để check trạng thái
    } catch (e) {
      toast.error(e.message || "Không thể tải chi tiết phiếu");
    }
  };

  const addDetail = async (phieuNhapId, form) => {
    try {
      await supplierImportDetailService.create(phieuNhapId, form);
      toast.success("Đã thêm sản phẩm");
      fetchDetails(phieuNhapId);
    } catch (e) {
      toast.error(e.message || "Lỗi thêm chi tiết");
    }
  };

  const removeDetail = async (detailId, phieuNhapId) => {
    try {
      await supplierImportDetailService.remove(detailId);
      toast.success("Đã xoá sản phẩm");
      fetchDetails(phieuNhapId);
    } catch (e) {
      toast.error(e.message || "Lỗi xoá chi tiết");
    }
  };

  return (
    <SupplierImportDetailContext.Provider
      value={{
        details,
        phieu,
        fetchDetails,
        addDetail,
        removeDetail,
      }}
    >
      {children}
    </SupplierImportDetailContext.Provider>
  );
};
