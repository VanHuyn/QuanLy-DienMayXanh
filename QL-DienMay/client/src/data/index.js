import {
  Home,
  Users,
  UserCog,
  Share2,
  LogIn,
  Warehouse,
  Truck,
  MessageSquare,
  FileText,
  Star,
  BarChart,
  Boxes,
  RotateCcw,
  History,
  BadgePercent,
  BarChart4,
  Settings,
  Layers,
  Package,
  LogOut,
  ClipboardCheck,
  Shuffle,
  ShoppingCart,
  PackageCheck,
  ShieldCheck,
  Store,
  FilePlus,
  FileMinus,
  Repeat,
  AlertTriangle,
} from "lucide-react";

export const menuHeader = [
  { title: "Máy lạnh", url: "danh-muc/may-lanh" },
  { title: "Tủ lạnh", url: "danh-muc/tu-lanh" },
  { title: "Máy lọc nước", url: "danh-muc/may-loc-nuoc" },
  { title: "Quạt sưởi", url: "danh-muc/quat-suoi" },
  { title: "Nồi chiên", url: "danh-muc/noi-chien" },
  { title: "Tivi", url: "danh-muc/tivi" },
  { title: "Máy rửa chén", url: "danh-muc/may-rua-chen" },
  { title: "Loa", url: "danh-muc/loa" },
  { title: "Nồi cơm điện", url: "danh-muc/noi-com-dien" },
  { title: "Máy lọc không khí", url: "danh-muc/may-loc-khong-khi" },
];
export const danhmuc = [
  {
    name: "Máy giặt",
    img: "https://cdnv2.tgdd.vn/mwg-static/common/Common/0a/b9/0ab938f5b5b2993d568351bceb721407.png",
    slug: "may-giat",
  },
  {
    name: "Tivi",
    img: "https://cdnv2.tgdd.vn/mwg-static/common/Common/64/d1/64d11a09c75ea322dbc547739886e1d5.png",
    slug: "tivi",
  },
  {
    name: "Tủ lạnh",
    img: "https://cdnv2.tgdd.vn/mwg-static/common/Common/64/85/6485154d19085e781f44d057f1c63c71.png",
    slug: "tu-lanh",
  },
  {
    name: "Nồi chiên",
    img: "https://cdnv2.tgdd.vn/mwg-static/dmx/Common/a7/22/a7228261dc5f50181285c1358574c4e1.png",
    slug: "noi-chien",
  },
  {
    name: "Máy lọc nước",
    img: "https://cdnv2.tgdd.vn/mwg-static/common/Common/ff/40/ff40b05375a001ea1f246cfd81fcbd12.png",
    slug: "may-loc-nuoc",
  },
  {
    name: "Hút bụi",
    img: "https://cdnv2.tgdd.vn/mwg-static/dmx/Common/ad/d4/add43c28ca2de72ffdef6c59b19bf7a7.png",
    slug: "hut-bui",
  },
  {
    name: "Máy lọc không khí",
    img: "https://cdnv2.tgdd.vn/mwg-static/dmx/Common/04/2e/042e6d1427540a418b516a9576e79b20.png",
    slug: "may-loc-khong-khi",
  },
  {
    name: "Sức khoẻ & làm đẹp",
    img: "https://cdnv2.tgdd.vn/mwg-static/dmx/Common/f1/d1/f1d12948bb2b74c2175f2eb29449f477.png",
    slug: "suc-khoe-lam-dep",
  },
  {
    name: "Máy lạnh",
    img: "https://cdnv2.tgdd.vn/mwg-static/common/Common/48/a6/48a6bd2b6d7ad2712eb93772b3578deb.png ",
    slug: "may-lanh",
  },
  {
    name: "Gia dụng",
    img: "https://cdnv2.tgdd.vn/mwg-static/dmx/Common/8c/1b/8c1b71a6a8fc062456825e6483b26e6b.png",
    slug: "gia-dung",
  },
  {
    name: "Máy sấy",
    img: "https://cdnv2.tgdd.vn/mwg-static/dmx/Common/0c/c3/0cc360b738e93b746af289ba67029e57.png",
    slug: "may-say",
  },
  {
    name: "Máy nước nóng",
    img: "https://cdnv2.tgdd.vn/mwg-static/dmx/Common/e5/94/e594135d5eed6cc128fe2a9c62154ad9.png",
    slug: "may-nuoc-nong",
  },
  {
    name: "Nồi cơm điện",
    img: "https://cdnv2.tgdd.vn/mwg-static/dmx/Common/2a/8c/2a8ca60d0f63068060068e3884032499.png",
    slug: "noi-com-dien",
  },
  {
    name: "Tủ đông/mát",
    img: "https://cdnv2.tgdd.vn/mwg-static/dmx/Common/5f/fc/5ffc124606fecac8c77bceb28b9c5c05.png",
    slug: "tu-dong-mat",
  },
  {
    name: "Bếp từ",
    img: "https://cdnv2.tgdd.vn/mwg-static/dmx/Common/44/0a/440ad5a5abd2b19e2d7ec9c3cf5cb707.png",
    slug: "bep-tu",
  },
  {
    name: "Tất cả danh mục",
    img: "https://cdnv2.tgdd.vn/mwg-static/dmx/Common/9c/c7/9cc7b36387641fc1bdde6bb3909e4b07.png",
    slug: "tat-ca",
  },
];
export const TrangChuImages1 = [
  "https://s3-hcmc02.higiocloud.vn/images/2025/09/867x400-20250925122319.png",
  "https://cdnv2.tgdd.vn/bhx-static/bhx/5185/trang-cate-pc-2_202507070959119347.jpg",
  "https://cdnv2.tgdd.vn/bhx-static/bhx/5185/trang-cate-pc-1_202507100918255110.jpg",
  "https://s3-hcmc02.higiocloud.vn/images/2025/10/homepage_867x400-20251008021420.jpg",
];

// admin
export const menuAdmin = [
  { path: "/admin/dashboard", label: "Trang chủ", icon: Home },
  { path: "/admin/roles", label: "Phân quyền", icon: ShieldCheck },
  { path: "/admin/accounts", label: "Quản lý tài khoản", icon: Users },
  { path: "/admin/categories", label: "Danh mục sản phẩm", icon: Layers },
  { path: "/admin/products", label: "Sản phẩm", icon: Package },
  {
    path: "/admin/promotions",
    label: "Khuyến mãi & ưu đãi",
    icon: BadgePercent,
  },
  // ncc
  { path: "/admin/suppliers", label: "Nhà cung cấp (NCC)", icon: Truck },
  { path: "/admin/branchs", label: "Quản lý chi nhánh", icon: Truck },
  {
    path: "/admin/branch-warehouses",
    label: "Quản lý kho chi nhánh",
    icon: Truck,
  },
  {
    path: "/admin/supplier-imports",
    label: "Phiếu nhập từ NCC",
    icon: FilePlus,
  },
  { path: "/admin/warehouses", label: "Kho tổng", icon: Warehouse },
  // { path: "/admin/warehousebranch", label: "Kho chi nh", icon: Warehouse },
  { path: "/admin/inventory", label: "Tồn kho", icon: Boxes },
  {
    path: "/admin/inventory-check",
    label: "Kiểm kê & điều chỉnh",
    icon: ClipboardCheck,
  },
  { path: "/admin/order", label: "Đơn hàng", icon: FileMinus },

  // Luồng kho
  { path: "/admin/exports", label: "Xuất kho cho chi nhánh", icon: FileMinus },
  // { path: "/admin/transfers", label: "Điều chuyển kho", icon: Repeat },

  // Hệ thống thống kê lớn
  { path: "/admin/revenue", label: "Thống kê doanh thu", icon: BarChart4 },
  // Cấu hình
  // { path: "/admin/settings", label: "Cài đặt hệ thống", icon: Settings },
];
// quản lý chi nhánh
export const menuBranchManager = [
  {
    path: "/manager/dashboard",
    label: "Tổng quan chi nhánh",
    icon: Home, // tổng hợp nhanh: doanh thu, tồn kho, đơn hàng
  },
  {
    path: "/manager/staff",
    label: "Quản lý nhân viên",
    icon: Users,
  },
  {
    path: "/manager/inventory",
    label: "Tồn kho chi nhánh",
    icon: Boxes,
  },
  {
    path: "/manager/request-import",
    label: "Nhập hàng",
    icon: Truck,
  },
  {
    path: "/manager/order",
    label: "Đơn hàng",
    icon: Truck,
  },
  {
    path: "/manager/revenue",
    label: "Doanh thu chi nhánh",
    icon: BarChart,
  },
  // {
  //   path: "/manager/top-products",
  //   label: "Hàng bán chạy",
  //   icon: Star,
  // },
  // {
  //   path: "/manager/orders",
  //   label: "Hóa đơn & lợi nhuận",
  //   icon: FileText,
  // },
  // {
  //   path: "/manager/reviews",
  //   label: "Đánh giá khách hàng",
  //   icon: MessageSquare,
  // },
];

// nhân viên kho tổng
export const menuCentralWarehouse = [
  { path: "/warehouse/dashboard", label: "Dashboard", icon: Warehouse },
  { path: "/warehouse/import", label: "Nhập hàng từ NCC", icon: LogIn },
  {
    path: "/warehouse/distribution",
    label: "Phân phối cho chi nhánh",
    icon: Share2,
  },
  { path: "/warehouse/stock", label: "Tồn kho tổng", icon: Boxes },
  // { path: "/warehouse/history", label: "Lịch sử nhập/xuất", icon: History },
  // { path: "/warehouse/returns", label: "Hàng lỗi / trả về", icon: RotateCcw },
];
// kho chi nhánh
export const warehousebranch = [
  { path: "/warehousebranch/dashboard", label: "Dashboard", icon: Home },
  { path: "/warehousebranch/stock", label: "Tồn kho chi nhánh", icon: Boxes },
  {
    path: "/warehousebranch/receive",
    label: "Nhận hàng từ kho tổng",
    icon: LogIn,
  },
  {
    path: "/warehousebranch/transfer",
    label: "Điều chuyển chi nhánh",
    icon: Shuffle,
  },
  {
    path: "/warehousebranch/check",
    label: "Kiểm kê kho",
    icon: ClipboardCheck,
  },
  {
    path: "/warehousebranch/out",
    label: "Xuất hàng cho bán hàng",
    icon: LogOut,
  },
];
// nhân viên bán hàng
export const menuSalesStaff = [
  { path: "/staff/dashboard", label: "Bán hàng", icon: ShoppingCart },
  { path: "/staff/orders", label: "Xử lý đơn online", icon: PackageCheck },
  { path: "/staff/invoice", label: "Hóa đơn bán hàng", icon: FileText },
  { path: "/staff/support", label: "Tư vấn & hỗ trợ", icon: MessageSquare },
  { path: "/staff/exchange", label: "Đổi trả / bảo hành", icon: RotateCcw },
  { path: "/staff/history", label: "Lịch sử giao dịch", icon: History },
];
