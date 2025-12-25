import { createContext, useContext, useEffect, useState } from "react";
import inventoryService from "../services/inventoryService";
import toast from "react-hot-toast";

const InventoryContext = createContext();
export const useInventory = () => useContext(InventoryContext);

export const InventoryProvider = ({ children }) => {
  const [inventories, setInventories] = useState([]);
  const [loading, setLoading] = useState(false);

  // =======================
  // LẤY TỒN KHO
  // =======================
  const fetchInventories = async () => {
    setLoading(true);
    try {
      const data = await inventoryService.getAll();

      const mapped = data.map((i) => ({
        ...i,
        SoLuongThucTe: i.SoLuong,
      }));

      setInventories(mapped);
    } catch (e) {
      toast.error("Không tải được tồn kho");
    } finally {
      setLoading(false);
    }
  };

  // =======================
  // 🔥 CHỈ LẤY TỒN KHO TỔNG CÓ HÀNG
  // =======================
  const khoTongInventories = inventories.filter(
    (i) => i.KhoTongId && Number(i.SoLuong) > 0
  );

  // =======================
  // KIỂM KÊ
  // =======================
  const updateSoLuongThucTe = (id, value) => {
    setInventories((prev) =>
      prev.map((i) =>
        i.Id === id ? { ...i, SoLuongThucTe: Number(value) } : i
      )
    );
  };

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
      toast.success("Kiểm kê thành công");
      fetchInventories();
    } catch (e) {
      toast.error("Lỗi kiểm kê");
    }
  };

  // =======================
  // 🔥 XUẤT KHO CHO CHI NHÁNH
  // =======================
  const exportToBranch = async ({
    bienTheId,
    khoTongId,
    khoChiNhanhId,
    soLuong,
  }) => {
    try {
      await inventoryService.exportToBranch({
        bienTheId,
        khoTongId,
        khoChiNhanhId,
        soLuong,
      });
      toast.success("Xuất kho thành công");
      fetchInventories();
    } catch (e) {
      toast.error(e.response?.data?.message || "Xuất kho thất bại");
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
        // 🔥 DÙNG CHO FORM XUẤT KHO
        khoTongInventories,

        fetchInventories,
        updateSoLuongThucTe,
        submitInventoryCheck,
        exportToBranch,
      }}
    >
      {children}
    </InventoryContext.Provider>
  );
};
