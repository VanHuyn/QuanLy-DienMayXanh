import { Route, Routes } from "react-router-dom";
import Layout from "./components/customer/Layout";
import Homepage from "./pages/customer/Homepage";
import NotFound from "./pages/customer/NotFound";
import Login from "./pages/customer/Login";
import Register from "./pages/customer/Register";
import ProductDetailPage from "./pages/customer/ProductDetailPage";
import CategoryPage from "./pages/customer/CategoryPage";
import CartPage from "./pages/customer/CartPage";
import AdminLayout from "./components/admin/AdminLayout";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminDashboard from "./pages/admin/AdminDashboard";
import { Toaster } from "react-hot-toast";
import RoleManagement from "./pages/admin/RoleManagement";
import UserManagement from "./pages/admin/UserManagement";
import CategoryManagement from "./pages/admin/CategoryManagement";
import SupplierManagement from "./pages/admin/SupplierManagement";
import ProductManagement from "./pages/admin/ProductManagement";
import WarehouseManagement from "./pages/admin/WarehouseManagement";
import SupplierImportManagement from "./pages/admin/SupplierImportManagement";
import SupplierImportDetailPage from "./pages/admin/SupplierImportDetailPage";
import InventoryPage from "./pages/admin/InventoryPage";
import InventoryCheckPage from "./pages/admin/InventoryCheckPage";
import BranchManagement from "./pages/admin/BranchManagement";
import BranchWarehouseManagement from "./pages/admin/BranchWarehouseManagement";
export default function App() {
  return (
    <div>
      <Routes>
        {/* khách hàng */}
        <Route element={<Layout />}>
          <Route path="/" element={<Homepage />} />
          <Route path="/dang-nhap" element={<Login />} />
          <Route path="/dang-ky" element={<Register />} />
          <Route path="/san-pham/:id" element={<ProductDetailPage />} />
          <Route path="/danh-muc/:slug" element={<CategoryPage />} />
          <Route path="/gio-hang" element={<CartPage />} />
          <Route path="*" element={<NotFound />} />
        </Route>

        {/* <Route element={<ProtectedRoute allowedRoles={["admin"]} />}> */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="roles" element={<RoleManagement />} />
          <Route path="accounts" element={<UserManagement />} />
          <Route path="branchs" element={<BranchManagement />} />
          {/* danh mục */}
          <Route path="categories" element={<CategoryManagement />} />
          <Route path="suppliers" element={<SupplierManagement />} />
          <Route path="products" element={<ProductManagement />} />
          <Route path="warehouses" element={<WarehouseManagement />} />
          <Route path="supplier-imports" element={<SupplierImportManagement />} />
          <Route path="supplier-imports/:id" element={<SupplierImportDetailPage />} />
          <Route path="branch-warehouses" element={<BranchWarehouseManagement />} />
          {/* tồn kho */}
          <Route path="inventory" element={<InventoryPage />} />
          <Route path="inventory-check" element={<InventoryCheckPage />} />
          <Route path="*" element={<NotFound />} />
        </Route>
        {/* </Route> */}
      </Routes>
      <Toaster position="top-right" />
    </div>
  );
}
