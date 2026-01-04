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
import ExportToBranchPage from "./pages/admin/ExportToBranchPage";
import CheckoutPage from "./pages/customer/CheckoutPage";
import OrderHistoryPage from "./pages/customer/OrderHistoryPage";
import ProfilePage from "./pages/customer/ProfilePage";
import ManagerLayout from "./components/manager/ManagerLayout";
import ManagerDashboard from "./pages/manager/ManagerDashboard";
import BranchRevenuePage from "./pages/manager/BranchRevenuePage";
import AdminProfile from "./pages/admin/AdminProfile";
import ManagerProfile from "./pages/manager/ManagerProfile";
import StaffManagement from "./pages/manager/StaffManagement";
import InventoryManagerPage from "./pages/manager/InventoryManagerPage";
import ExportToBranchManagerPage from "./pages/manager/ExportToBranchPageManager";
import WarehouseLayout from "./components/warehouse/WarehouseLayout";
import WarehouseDashboard from "./pages/warehouse/WarehouseDashboard";
import SupplierImportManagementWarehouse from "./pages/warehouse/SupplierImportManagementWarehouse";
import SupplierImportDetailPageWarehouse from "./pages/warehouse/SupplierImportDetailPageWarehouse";
import WarehouseProfile from "./pages/warehouse/WarehouseProfile";
import WarehouseBranchLayout from "./components/warehousebranch/WarehouseBranchLayout";
import WarehouseBranchDashboard from "./pages/warehouseBranch/WarehouseBranchDashboard";
import StaffLayout from "./components/staff/StaffLayout";
import StaffDashboard from "./pages/staff/StaffDashboard";
import WarehouseBranchProfile from "./pages/warehouseBranch/WarehouseBranchProfile";
import StaffProfile from "./pages/staff/StaffProfile";
import SearchPage from "./components/customer/SearchPage";
import AdminOrdersPage from "./pages/admin/AdminOrdersPage";
import PromotionPage from "./pages/admin/PromotionPage";
import PaymentSuccessPage from "./pages/customer/PaymentSuccessPage";
import BranchManagerOrdersPage from "./pages/manager/BranchManagerOrdersPage";
import AdminRevenuePage from "./pages/admin/AdminRevenuePage";
import BranchStaffOrdersPage from "./pages/staff/BranchStaffOrdersPage";
import InvoicePage from "./pages/staff/InvoicePage";
import ChatSupportPage from "./pages/staff/ChatSupportPage";
export default function App() {
  return (
    <div>
      <Routes>
        {/* khách hàng */}
        <Route element={<Layout />}>
          <Route path="/" element={<Homepage />} />
          <Route path="/dang-nhap" element={<Login />} />
          <Route path="/dang-ky" element={<Register />} />
          <Route path="/tim-kiem" element={<SearchPage />} />
          <Route path="/san-pham/:id" element={<ProductDetailPage />} />
          <Route path="/danh-muc/:slug" element={<CategoryPage />} />
          <Route path="/gio-hang" element={<CartPage />} />
          <Route path="/dat-hang" element={<CheckoutPage />} />
          <Route path="/lich-su-don-hang" element={<OrderHistoryPage />} />
          <Route path="/thong-tin-ca-nhan" element={<ProfilePage />} />
          <Route path="/thanh-toan-thanh-cong" element={<PaymentSuccessPage />} />
          <Route path="*" element={<NotFound />} />
        </Route>

        {/* <Route element={<ProtectedRoute allowedRoles={["admin"]} />}> */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="profile" element={<AdminProfile />} />
          <Route path="roles" element={<RoleManagement />} />
          <Route path="promotions" element={<PromotionPage />} />
          <Route path="accounts" element={<UserManagement />} />
          <Route path="branchs" element={<BranchManagement />} />
          <Route path="order" element={<AdminOrdersPage />} />
          {/* danh mục */}
          <Route path="categories" element={<CategoryManagement />} />
          <Route path="suppliers" element={<SupplierManagement />} />
          <Route path="products" element={<ProductManagement />} />
          <Route path="revenue" element={<AdminRevenuePage />} />
          <Route path="warehouses" element={<WarehouseManagement />} />
          <Route
            path="supplier-imports"
            element={<SupplierImportManagement />}
          />
          <Route
            path="supplier-imports/:id"
            element={<SupplierImportDetailPage />}
          />
          <Route
            path="branch-warehouses"
            element={<BranchWarehouseManagement />}
          />
          {/* tồn kho */}
          <Route path="inventory" element={<InventoryPage />} />
          <Route path="exports" element={<ExportToBranchPage />} />
          <Route path="*" element={<NotFound />} />
        </Route>
        {/* quản lý */}
        <Route path="/manager" element={<ManagerLayout />}>
          <Route path="dashboard" element={<ManagerDashboard />} />
          <Route path="revenue" element={<BranchRevenuePage />} />
          <Route path="inventory" element={<InventoryManagerPage />} />
          <Route path="staff" element={<StaffManagement />} />
          <Route path="profile" element={<ManagerProfile />} />
          <Route path="order" element={<BranchManagerOrdersPage />} />
          <Route
            path="request-import"
            element={<ExportToBranchManagerPage />}
          />
          <Route path="*" element={<NotFound />} />
        </Route>
        {/* kho tổng */}
        <Route path="/warehouse" element={<WarehouseLayout />}>
          <Route path="dashboard" element={<WarehouseDashboard />} />
          <Route path="profile" element={<WarehouseProfile />} />
          <Route
            path="import"
            element={<SupplierImportManagementWarehouse />}
          />
          <Route
            path="import/:id"
            element={<SupplierImportDetailPageWarehouse />}
          />
          <Route path="distribution" element={<ExportToBranchPage />} />
          <Route path="stock" element={<InventoryPage />} />
          <Route path="*" element={<NotFound />} />
          {/* kho chi nhánh */}
        </Route>
        <Route path="/warehousebranch" element={<WarehouseBranchLayout />}>
          <Route path="dashboard" element={<WarehouseBranchDashboard />} />
          <Route path="stock" element={<InventoryManagerPage />} />
          <Route path="inventory-check" element={<InventoryCheckPage />} />
          <Route path="profile" element={<WarehouseBranchProfile />} />
          <Route path="*" element={<NotFound />} />
        </Route>
        {/* nhân viên */}
        <Route path="/staff" element={<StaffLayout />}>
          <Route path="dashboard" element={<StaffDashboard />} />
          <Route path="profile" element={<StaffProfile />} />
          <Route path="orders" element={<BranchStaffOrdersPage />} />
          <Route path="invoice" element={<InvoicePage />} />
          <Route path="support" element={<ChatSupportPage />} />
          <Route path="*" element={<NotFound />} />
        </Route>
        {/* </Route> */}
      </Routes>
      <Toaster position="top-right" />
    </div>
  );
}
