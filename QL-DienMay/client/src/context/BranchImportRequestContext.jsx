import { createContext, useContext } from "react";
// import branchImportService from "../services/BranchImportService";
import toast from "react-hot-toast";

const BranchImportRequestContext = createContext();
export const useBranchImportRequests = () =>
  useContext(BranchImportRequestContext);

export const BranchImportRequestProvider = ({ children }) => {
  const createRequest = async (data) => {
    // await branchImportService.create(data);
    toast.success("Đã gửi yêu cầu nhập hàng");
  };

  return (
    <BranchImportRequestContext.Provider value={{ createRequest }}>
      {children}
    </BranchImportRequestContext.Provider>
  );
};
