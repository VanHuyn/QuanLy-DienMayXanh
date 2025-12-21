import { createContext, useContext, useEffect, useState } from "react";
import branchService from "../services/branchService";
import toast from "react-hot-toast";

const BranchContext = createContext();
export const useBranches = () => useContext(BranchContext);

export const BranchProvider = ({ children }) => {
  const [branches, setBranches] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchBranches = async () => {
    setLoading(true);
    try {
      const data = await branchService.getAll();
      setBranches(data);
    } catch (e) {
      toast.error("Không tải được danh sách chi nhánh");
    } finally {
      setLoading(false);
    }
  };

  const createBranch = async (data) => {
    await branchService.create(data);
    toast.success("Tạo chi nhánh thành công");
    fetchBranches();
  };

  const updateBranch = async (id, data) => {
    await branchService.update(id, data);
    toast.success("Cập nhật chi nhánh thành công");
    fetchBranches();
  };

  const deleteBranch = async (id) => {
    await branchService.delete(id);
    toast.success("Xoá chi nhánh thành công");
    fetchBranches();
  };

  useEffect(() => {
    fetchBranches();
  }, []);

  return (
    <BranchContext.Provider
      value={{
        branches,
        loading,
        createBranch,
        updateBranch,
        deleteBranch,
      }}
    >
      {children}
    </BranchContext.Provider>
  );
};
