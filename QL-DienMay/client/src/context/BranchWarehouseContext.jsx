import { createContext, useContext, useEffect, useState } from "react";
import branchWarehouseService from "../services/BranchWarehouseService";
import toast from "react-hot-toast";

const BranchWarehouseContext = createContext();
export const useBranchWarehouses = () => useContext(BranchWarehouseContext);

export const BranchWarehouseProvider = ({ children }) => {
  const [warehouses, setWarehouses] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchWarehouses = async () => {
    setLoading(true);
    try {
      const data = await branchWarehouseService.getAll();
      setWarehouses(data);
    } catch (e) {
      toast.error("Không thể tải được kho chi nhánh");
    } finally {
      setLoading(false);
    }
  };

  const createWarehouse = async (data) => {
    await branchWarehouseService.create(data);
    toast.success("Branch warehouse created");
    fetchWarehouses();
  };

  const updateWarehouse = async (id, data) => {
    await branchWarehouseService.update(id, data);
    toast.success("Branch warehouse updated");
    fetchWarehouses();
  };

  const deleteWarehouse = async (id) => {
    await branchWarehouseService.delete(id);
    toast.success("Branch warehouse deleted");
    fetchWarehouses();
  };

  useEffect(() => {
    fetchWarehouses();
  }, []);

  return (
    <BranchWarehouseContext.Provider
      value={{
        warehouses,
        loading,
        fetchWarehouses,
        createWarehouse,
        updateWarehouse,
        deleteWarehouse,
      }}
    >
      {children}
    </BranchWarehouseContext.Provider>
  );
};
