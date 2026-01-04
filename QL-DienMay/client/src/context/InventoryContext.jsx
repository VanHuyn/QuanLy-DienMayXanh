import { createContext, useContext, useEffect, useState } from "react";
import inventoryService from "../services/inventoryService";
import toast from "react-hot-toast";

const InventoryContext = createContext();
export const useInventory = () => useContext(InventoryContext);

export const InventoryProvider = ({ children }) => {
  const [inventories, setInventories] = useState([]); // Dùng chung cho các form kiểm kê nếu cần
  const [khoTongInventories, setKhoTongInventories] = useState([]); // riêng kho tổng
  const [khoChiNhanhInventories, setKhoChiNhanhInventories] = useState([]); // riêng kho chi nhánh
  const [loading, setLoading] = useState(false);

  // ===================
  // FETCH KHO TỔNG
  // ===================
  const fetchInventories = async () => {
    setLoading(true);
    try {
      const data = await inventoryService.getAll();

      const mapped = data.map((i) => ({
        ...i,
        SoLuongThucTe: i.SoLuong,
      }));

      setInventories(mapped);
      setKhoTongInventories(mapped.filter((i) => i.KhoTongId && Number(i.SoLuong) > 0));
    } catch (e) {
      toast.error("Không tải được tồn kho");
    } finally {
      setLoading(false);
    }
  };

  // ===================
  // FETCH KHO CHI NHÁNH
  // ===================
  const fetchMyBranchInventories = async () => {
    setLoading(true);
    try {
      const data = await inventoryService.getMyBranchInventories();
      setKhoChiNhanhInventories(data);
    } catch (e) {
      toast.error("Không tải được tồn kho chi nhánh");
    } finally {
      setLoading(false);
    }
  };

  // ===================
  // KIỂM KÊ
  // ===================
  const updateSoLuongThucTe = (id, value) => {
    setInventories((prev) =>
      prev.map((i) =>
        i.Id === id ? { ...i, SoLuongThucTe: Number(value) } : i
      )
    );
  };

  const submitInventoryCheck = async (KhoTongId, GhiChu = "") => {
    console.log(KhoTongId, GhiChu)
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

  // ===================
  // XUẤT KHO CHO CHI NHÁNH
  // ===================
  const exportToBranch = async ({ bienTheId, khoTongId, khoChiNhanhId, soLuong }) => {
    try {
      await inventoryService.exportToBranch({
        bienTheId,
        khoTongId,
        khoChiNhanhId,
        soLuong,
      });
      toast.success("Xuất kho thành công");
      fetchInventories(); // cập nhật lại kho tổng
      fetchMyBranchInventories(); // cập nhật lại kho chi nhánh
    } catch (e) {
      toast.error(e.response?.data?.message || "Xuất kho thất bại");
    }
  };

  useEffect(() => {
    fetchInventories(); // mặc định fetch kho tổng khi load app
  }, []);

  return (
    <InventoryContext.Provider
      value={{
        inventories,
        loading,
        khoTongInventories,
        khoChiNhanhInventories,
        fetchMyBranchInventories,
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
