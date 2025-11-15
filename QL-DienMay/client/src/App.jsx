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
            {/* danh mục */}
            <Route path="*" element={<NotFound />} />
          </Route>
        {/* </Route> */}
      </Routes>
    </div>
  );
}
