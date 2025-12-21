import { createContext, useContext, useEffect, useState } from "react";
import inventoryService from "../services/inventoryService";
import toast from "react-hot-toast";

const InventoryContext = createContext();
export const useInventory = () => useContext(InventoryContext);

export const InventoryProvider = ({ children }) => {
  const [inventories, setInventories] = useState([]);
  const [loading, setLoading] = useState(false);

  // Lấy tồn kho
  const fetchInventories = async () => {
    setLoading(true);
    try {
      const data = await inventoryService.getAll();

      // thêm SoLuongThucTe để kiểm kê
      const mapped = data.map((i) => ({
        ...i,
        SoLuongThucTe: i.SoLuong,
      }));

      setInventories(mapped);
    } catch (e) {
      console.error("Lỗi lấy tồn kho", e);
      toast.error("Không tải được tồn kho");
    } finally {
      setLoading(false);
    }
  };

  // cập nhật tồn thực tế
  const updateSoLuongThucTe = (id, value) => {
    setInventories((prev) =>
      prev.map((i) =>
        i.Id === id ? { ...i, SoLuongThucTe: Number(value) } : i
      )
    );
  };

  // gửi kiểm kê
  const submitInventoryCheck = async (KhoTongId, GhiChu = "") => {
    const ChiTiet = inventories
      .filter((i) => Number(i.SoLuongThucTe) !== Number(i.SoLuong))
      .map((i) => ({
        BienTheSanPhamId: i.BienTheSanPhamId,
        SoLuongThucTe: i.SoLuongThucTe,
      }));

    if (!ChiTiet.length) {
      toast("Không có chênh lệch tồn kho");
      return;
    }

    try {
      await inventoryService.adjustInventory({
        KhoTongId,
        GhiChu,
        ChiTiet,
      });
      toast.success("Kiểm kê & điều chỉnh thành công");
      fetchInventories();
    } catch (e) {
      toast.error(e.response?.data?.message || "Lỗi kiểm kê");
    }
  };

  useEffect(() => {
    fetchInventories();
  }, []);

  return (
    <InventoryContext.Provider
      value={{
        inventories,
        loading,
        fetchInventories,
        // kiểm kê
        updateSoLuongThucTe,
        submitInventoryCheck,
      }}
    >
      {children}
    </InventoryContext.Provider>
  );
};
