import { createContext, useContext, useState } from "react";
import userService from "../services/userService";
import toast from "react-hot-toast";

const StaffContext = createContext();
export const useStaffs = () => useContext(StaffContext);

export function StaffProvider({ children }) {
  const [staffs, setStaffs] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchByBranch = async (chiNhanhId) => {
    if (!chiNhanhId) return;

    try {
      setLoading(true);
      const data = await userService.getByBranch(chiNhanhId);
      setStaffs(data);
    } catch {
      toast.error("Không thể tải nhân viên");
    } finally {
      setLoading(false);
    }
  };

  const createStaff = async (data) => {
    await userService.create(data);
  };

  const updateStaff = async (id, data) => {
    await userService.update(id, data);
  };

  const deleteStaff = async (id) => {
    await userService.delete(id);
  };

  return (
    <StaffContext.Provider
      value={{
        staffs,
        loading,
        fetchByBranch,
        createStaff,
        updateStaff,
        deleteStaff,
      }}
    >
      {children}
    </StaffContext.Provider>
  );
}
