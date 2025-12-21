import { createContext, useContext, useEffect, useState } from "react";
import warehouseService from "../services/warehouseService";
import toast from "react-hot-toast";

const WarehouseContext = createContext();
export const useWarehouses = () => useContext(WarehouseContext);

export const WarehouseProvider = ({ children }) => {
  const [warehouses, setWarehouses] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchWarehouses = async () => {
    try {
      setLoading(true);
      const res = await warehouseService.getAll();
      setWarehouses(res || []);
    } catch (err) {
      toast.error("Không thể tải kho tổng");
    } finally {
      setLoading(false);
    }
  };

  const createWarehouse = async (data) => {
    await warehouseService.create(data);
    toast.success("Thêm kho thành công");
    fetchWarehouses();
  };

  const updateWarehouse = async (id, data) => {
    await warehouseService.update(id, data);
    toast.success("Cập nhật kho thành công");
    fetchWarehouses();
  };

  const deleteWarehouse = async (id) => {
    await warehouseService.delete(id);
    toast.success("Xoá kho thành công");
    fetchWarehouses();
  };

  useEffect(() => {
    fetchWarehouses();
  }, []);

  return (
    <WarehouseContext.Provider
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
    </WarehouseContext.Provider>
  );
};
