import { createContext, useContext, useState } from "react";
import InvoiceService from "../services/invoiceService";

const InvoiceContext = createContext();

export const InvoiceProvider = ({ children }) => {
  const [invoices, setInvoices] = useState([]);
  const [invoiceDetail, setInvoiceDetail] = useState(null);
  const [loading, setLoading] = useState(false);

  // Lấy danh sách hóa đơn
  const fetchInvoices = async (params = {}) => {
    try {
      setLoading(true);
      const data = await InvoiceService.getInvoices(params);
      setInvoices(data);
    } catch (err) {
      console.error("Lỗi fetch hóa đơn:", err);
    } finally {
      setLoading(false);
    }
  };

  // Lấy chi tiết 1 hóa đơn
  const fetchInvoiceById = async (id) => {
    try {
      setLoading(true);
      const data = await InvoiceService.getInvoiceById(id);
      setInvoiceDetail(data);
    } catch (err) {
      console.error("Lỗi fetch chi tiết hóa đơn:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <InvoiceContext.Provider
      value={{
        invoices,
        invoiceDetail,
        loading,
        fetchInvoices,
        fetchInvoiceById,
      }}
    >
      {children}
    </InvoiceContext.Provider>
  );
};

// Hook tiện lợi
export const useInvoice = () => useContext(InvoiceContext);
