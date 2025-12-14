import React, { createContext, useContext, useState, useEffect } from "react";
import roleService from "../services/roleService";
import toast from "react-hot-toast";

const RoleContext = createContext();
export const useRoles = () => useContext(RoleContext);

export const RoleProvider = ({ children }) => {
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchRoles = async () => {
    setLoading(true);
    try {
      const data = await roleService.getAll();
      setRoles(data);
    } catch (err) {
      toast.error("Không thể tải danh sách vai trò");
    }
    setLoading(false);
  };

  const createRole = async (roleData) => {
    try {
      await roleService.create(roleData);
      toast.success("Tạo vai trò thành công");
      fetchRoles();
    } catch (err) {
      toast.error(err.message);
    }
  };

  const updateRole = async (id, roleData) => {
    try {
      await roleService.update(id, roleData);
      toast.success("Cập nhật vai trò thành công");
      fetchRoles();
    } catch (err) {
      toast.error(err.message);
    }
  };

  const deleteRole = async (id) => {
    try {
      await roleService.delete(id);
      toast.success("Xoá vai trò thành công");
      fetchRoles();
    } catch (err) {
      toast.error(err.message); //  Hiển thị nguyên nhân từ backend !
    }
  };

  useEffect(() => {
    fetchRoles();
  }, []);

  return (
    <RoleContext.Provider
      value={{
        roles,
        loading,
        createRole,
        updateRole,
        deleteRole,
      }}
    >
      {children}
    </RoleContext.Provider>
  );
};
