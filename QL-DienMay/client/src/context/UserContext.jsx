import React, { createContext, useContext, useEffect, useState } from "react";
import userService from "../services/userService";
import toast from "react-hot-toast";

const UserContext = createContext();
export const useUsers = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await userService.getAll();
      setUsers(res.data || []);
    } catch (err) {
      toast.error("Không thể tải danh sách người dùng");
    } finally {
      setLoading(false);
    }
  };

  const createUser = async (data) => {
    try {
      const res = await userService.create(data);
      if (res.message) toast.success(res.message);
      fetchUsers();
    } catch (err) {
      toast.error("Lỗi khi tạo người dùng");
    }
  };

  const updateUser = async (id, data) => {
    try {
      const res = await userService.update(id, data);
      toast.success(res.message || "Cập nhật thành công");
      fetchUsers();
    } catch (err) {
      toast.error("Lỗi khi cập nhật");
    }
  };

  const deleteUser = async (id) => {
    try {
      const res = await userService.delete(id);
      toast.success(res.message);
      fetchUsers();
    } catch (err) {
      toast.error(err.message);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <UserContext.Provider
      value={{
        users,
        loading,
        createUser,
        updateUser,
        deleteUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
