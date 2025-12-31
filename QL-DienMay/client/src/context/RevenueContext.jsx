import { createContext, useContext, useState, useEffect } from "react";
import { RevenueService } from "../services/revenueService";

const RevenueContext = createContext();

export const useRevenue = () => useContext(RevenueContext);

export const RevenueProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [adminRevenue, setAdminRevenue] = useState(0);
  const [branchRevenue, setBranchRevenue] = useState(0);
  const [allBranchesRevenue, setAllBranchesRevenue] = useState([]);
  const [dailyRevenue, setDailyRevenue] = useState([]);

  // Load doanh thu admin
  const fetchAdminRevenue = async () => {
    setLoading(true);
    try {
      const data = await RevenueService.getAdminRevenue();
      setAdminRevenue(data.doanhThu || 0);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Load doanh thu chi nhánh
  const fetchBranchRevenue = async (branchId) => {
    setLoading(true);
    try {
      const data = await RevenueService.getBranchRevenue(branchId);
      setBranchRevenue(data.doanhThu || 0);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Load tất cả chi nhánh
  const fetchAllBranchesRevenue = async () => {
    setLoading(true);
    try {
      const data = await RevenueService.getAllBranchesRevenue();
      setAllBranchesRevenue(data.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Load doanh thu theo ngày (optionally branch)
  const fetchDailyRevenue = async (branchId) => {
    setLoading(true);
    try {
      const data = await RevenueService.getDailyRevenue(branchId);
      setDailyRevenue(data.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <RevenueContext.Provider
      value={{
        loading,
        adminRevenue,
        branchRevenue,
        allBranchesRevenue,
        dailyRevenue,
        fetchAdminRevenue,
        fetchBranchRevenue,
        fetchAllBranchesRevenue,
        fetchDailyRevenue,
      }}
    >
      {children}
    </RevenueContext.Provider>
  );
};
