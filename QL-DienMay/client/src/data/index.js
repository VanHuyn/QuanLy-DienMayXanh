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

export const testProducts = [
  // Nồi cơm
  {
    id: 1,
    name: "Nồi cơm điện Panasonic 1.8L",
    category: "Nồi cơm",
    salePrice: 1290000,
    originalPrice: 1590000,
    rating: 5,
    sold: 980,
    image:
      "[https://cdn.tgdd.vn/Products/Images/5020/307896/TimerThumb/noi-com-dien-1-600x600.jpg](https://cdn.tgdd.vn/Products/Images/5020/307896/TimerThumb/noi-com-dien-1-600x600.jpg)",
  },
  {
    id: 2,
    name: "Nồi cơm điện Sharp 1.8L",
    category: "Nồi cơm",
    salePrice: 1390000,
    originalPrice: 1690000,
    rating: 4,
    sold: 450,
    image:
      "[https://cdn.tgdd.vn/Products/Images/5020/307897/TimerThumb/noi-com-sharp-1-600x600.jpg](https://cdn.tgdd.vn/Products/Images/5020/307897/TimerThumb/noi-com-sharp-1-600x600.jpg)",
  },
  {
    id: 3,
    name: "Nồi cơm điện Electrolux 1.5L",
    category: "Nồi cơm",
    salePrice: 1190000,
    originalPrice: 1490000,
    rating: 4,
    sold: 320,
    image:
      "[https://cdn.tgdd.vn/Products/Images/5020/307898/TimerThumb/noi-com-electrolux-1-600x600.jpg](https://cdn.tgdd.vn/Products/Images/5020/307898/TimerThumb/noi-com-electrolux-1-600x600.jpg)",
  },
  {
    id: 4,
    name: "Nồi cơm điện Tefal 1.2L",
    category: "Nồi cơm",
    salePrice: 1090000,
    originalPrice: 1390000,
    rating: 4,
    sold: 210,
    image:
      "[https://cdn.tgdd.vn/Products/Images/5020/307899/TimerThumb/noi-com-tefal-1-600x600.jpg](https://cdn.tgdd.vn/Products/Images/5020/307899/TimerThumb/noi-com-tefal-1-600x600.jpg)",
  },
  {
    id: 5,
    name: "Nồi cơm điện Bluestone 1.8L",
    category: "Nồi cơm",
    salePrice: 1290000,
    originalPrice: 1590000,
    rating: 5,
    sold: 150,
    image:
      "[https://cdn.tgdd.vn/Products/Images/5020/307900/TimerThumb/noi-com-bluestone-1-600x600.jpg](https://cdn.tgdd.vn/Products/Images/5020/307900/TimerThumb/noi-com-bluestone-1-600x600.jpg)",
  },
  {
    id: 6,
    name: "Nồi cơm điện Kangaroo 1.8L",
    category: "Nồi cơm",
    salePrice: 1190000,
    originalPrice: 1490000,
    rating: 4,
    sold: 98,
    image:
      "[https://cdn.tgdd.vn/Products/Images/5020/307901/TimerThumb/noi-com-kangaroo-1-600x600.jpg](https://cdn.tgdd.vn/Products/Images/5020/307901/TimerThumb/noi-com-kangaroo-1-600x600.jpg)",
  },

  // Nồi chiên
  {
    id: 7,
    name: "Nồi chiên Lock&Lock 5L",
    category: "Nồi chiên",
    salePrice: 1890000,
    originalPrice: 2390000,
    rating: 4,
    sold: 670,
    image:
      "[https://cdn.tgdd.vn/Products/Images/4910/309876/TimerThumb/noi-chien-khong-dau-1-600x600.jpg](https://cdn.tgdd.vn/Products/Images/4910/309876/TimerThumb/noi-chien-khong-dau-1-600x600.jpg)",
  },
  {
    id: 8,
    name: "Nồi chiên Philips 4L",
    category: "Nồi chiên",
    salePrice: 2490000,
    originalPrice: 2990000,
    rating: 5,
    sold: 580,
    image:
      "[https://cdn.tgdd.vn/Products/Images/4910/309877/TimerThumb/noi-chien-philips-1-600x600.jpg](https://cdn.tgdd.vn/Products/Images/4910/309877/TimerThumb/noi-chien-philips-1-600x600.jpg)",
  },
  {
    id: 9,
    name: "Nồi chiên Sharp 5L",
    category: "Nồi chiên",
    salePrice: 1790000,
    originalPrice: 2190000,
    rating: 4,
    sold: 420,
    image:
      "[https://cdn.tgdd.vn/Products/Images/4910/309878/TimerThumb/noi-chien-sharp-1-600x600.jpg](https://cdn.tgdd.vn/Products/Images/4910/309878/TimerThumb/noi-chien-sharp-1-600x600.jpg)",
  },
  {
    id: 10,
    name: "Nồi chiên Tefal 3.5L",
    category: "Nồi chiên",
    salePrice: 1590000,
    originalPrice: 1990000,
    rating: 4,
    sold: 310,
    image:
      "[https://cdn.tgdd.vn/Products/Images/4910/309879/TimerThumb/noi-chien-tefal-1-600x600.jpg](https://cdn.tgdd.vn/Products/Images/4910/309879/TimerThumb/noi-chien-tefal-1-600x600.jpg)",
  },
  {
    id: 11,
    name: "Nồi chiên Bluestone 4.5L",
    category: "Nồi chiên",
    salePrice: 1890000,
    originalPrice: 2290000,
    rating: 5,
    sold: 220,
    image:
      "[https://cdn.tgdd.vn/Products/Images/4910/309880/TimerThumb/noi-chien-bluestone-1-600x600.jpg](https://cdn.tgdd.vn/Products/Images/4910/309880/TimerThumb/noi-chien-bluestone-1-600x600.jpg)",
  },
  {
    id: 12,
    name: "Nồi chiên Kangaroo 5L",
    category: "Nồi chiên",
    salePrice: 1690000,
    originalPrice: 2090000,
    rating: 4,
    sold: 150,
    image:
      "[https://cdn.tgdd.vn/Products/Images/4910/309881/TimerThumb/noi-chien-kangaroo-1-600x600.jpg](https://cdn.tgdd.vn/Products/Images/4910/309881/TimerThumb/noi-chien-kangaroo-1-600x600.jpg)",
  },

  // Máy lạnh
  {
    id: 13,
    name: "Máy lạnh LG 1 HP",
    category: "Máy lạnh",
    salePrice: 9490000,
    originalPrice: 10990000,
    rating: 5,
    sold: 150,
    image:
      "[https://cdn.tgdd.vn/Products/Images/4925/308976/TimerThumb/may-lanh-dieu-hoa-1-600x600.jpg](https://cdn.tgdd.vn/Products/Images/4925/308976/TimerThumb/may-lanh-dieu-hoa-1-600x600.jpg)",
  },
  {
    id: 14,
    name: "Máy lạnh Panasonic 1 HP",
    category: "Máy lạnh",
    salePrice: 10590000,
    originalPrice: 11990000,
    rating: 5,
    sold: 130,
    image:
      "[https://cdn.tgdd.vn/Products/Images/4925/308977/TimerThumb/may-lanh-panasonic-1-600x600.jpg](https://cdn.tgdd.vn/Products/Images/4925/308977/TimerThumb/may-lanh-panasonic-1-600x600.jpg)",
  },
  {
    id: 15,
    name: "Máy lạnh Daikin 1 HP",
    category: "Máy lạnh",
    salePrice: 12590000,
    originalPrice: 13990000,
    rating: 5,
    sold: 90,
    image:
      "[https://cdn.tgdd.vn/Products/Images/4925/308978/TimerThumb/may-lanh-daikin-1-600x600.jpg](https://cdn.tgdd.vn/Products/Images/4925/308978/TimerThumb/may-lanh-daikin-1-600x600.jpg)",
  },
  {
    id: 16,
    name: "Máy lạnh Samsung 1 HP",
    category: "Máy lạnh",
    salePrice: 9990000,
    originalPrice: 11490000,
    rating: 4,
    sold: 110,
    image:
      "[https://cdn.tgdd.vn/Products/Images/4925/308979/TimerThumb/may-lanh-samsung-1-600x600.jpg](https://cdn.tgdd.vn/Products/Images/4925/308979/TimerThumb/may-lanh-samsung-1-600x600.jpg)",
  },
  {
    id: 17,
    name: "Máy lạnh Sharp 1 HP",
    category: "Máy lạnh",
    salePrice: 8990000,
    originalPrice: 10490000,
    rating: 4,
    sold: 70,
    image:
      "[https://cdn.tgdd.vn/Products/Images/4925/308980/TimerThumb/may-lanh-sharp-1-600x600.jpg](https://cdn.tgdd.vn/Products/Images/4925/308980/TimerThumb/may-lanh-sharp-1-600x600.jpg)",
  },
  {
    id: 18,
    name: "Máy lạnh Electrolux 1 HP",
    category: "Máy lạnh",
    salePrice: 9490000,
    originalPrice: 10990000,
    rating: 4,
    sold: 50,
    image:
      "[https://cdn.tgdd.vn/Products/Images/4925/308981/TimerThumb/may-lanh-electrolux-1-600x600.jpg](https://cdn.tgdd.vn/Products/Images/4925/308981/TimerThumb/may-lanh-electrolux-1-600x600.jpg)",
  },

  // Tủ lạnh
  {
    id: 19,
    name: "Tủ lạnh Samsung 200L",
    category: "Tủ lạnh",
    salePrice: 6490000,
    originalPrice: 7490000,
    rating: 4,
    sold: 210,
    image:
      "[https://cdn.tgdd.vn/Products/Images/4923/305789/TimerThumb/tu-lanh-samsung-1-600x600.jpg](https://cdn.tgdd.vn/Products/Images/4923/305789/TimerThumb/tu-lanh-samsung-1-600x600.jpg)",
  },
  {
    id: 20,
    name: "Tủ lạnh Panasonic 180L",
    category: "Tủ lạnh",
    salePrice: 5990000,
    originalPrice: 6990000,
    rating: 4,
    sold: 180,
    image:
      "[https://cdn.tgdd.vn/Products/Images/4923/305790/TimerThumb/tu-lanh-panasonic-1-600x600.jpg](https://cdn.tgdd.vn/Products/Images/4923/305790/TimerThumb/tu-lanh-panasonic-1-600x600.jpg)",
  },
  {
    id: 21,
    name: "Tủ lạnh Electrolux 200L",
    category: "Tủ lạnh",
    salePrice: 6290000,
    originalPrice: 7290000,
    rating: 4,
    sold: 150,
    image:
      "[https://cdn.tgdd.vn/Products/Images/4923/305791/TimerThumb/tu-lanh-electrolux-1-600x600.jpg](https://cdn.tgdd.vn/Products/Images/4923/305791/TimerThumb/tu-lanh-electrolux-1-600x600.jpg)",
  },
  {
    id: 22,
    name: "Tủ lạnh Sharp 180L",
    category: "Tủ lạnh",
    salePrice: 5990000,
    originalPrice: 6990000,
    rating: 4,
    sold: 120,
    image:
      "[https://cdn.tgdd.vn/Products/Images/4923/305792/TimerThumb/tu-lanh-sharp-1-600x600.jpg](https://cdn.tgdd.vn/Products/Images/4923/305792/TimerThumb/tu-lanh-sharp-1-600x600.jpg)",
  },
  {
    id: 23,
    name: "Tủ lạnh Aqua 200L",
    category: "Tủ lạnh",
    salePrice: 6190000,
    originalPrice: 7190000,
    rating: 4,
    sold: 90,
    image:
      "[https://cdn.tgdd.vn/Products/Images/4923/305793/TimerThumb/tu-lanh-aqua-1-600x600.jpg](https://cdn.tgdd.vn/Products/Images/4923/305793/TimerThumb/tu-lanh-aqua-1-600x600.jpg)",
  },
  {
    id: 24,
    name: "Tủ lạnh Kangaroo 180L",
    category: "Tủ lạnh",
    salePrice: 5890000,
    originalPrice: 6890000,
    rating: 4,
    sold: 70,
    image:
      "[https://cdn.tgdd.vn/Products/Images/4923/305794/TimerThumb/tu-lanh-kangaroo-1-600x600.jpg](https://cdn.tgdd.vn/Products/Images/4923/305794/TimerThumb/tu-lanh-kangaroo-1-600x600.jpg)",
  },

  // Máy sấy
  {
    id: 25,
    name: "Máy sấy tóc Philips",
    category: "Máy sấy",
    salePrice: 450000,
    originalPrice: 550000,
    rating: 4,
    sold: 430,
    image:
      "[https://cdn.tgdd.vn/Products/Images/4926/307896/TimerThumb/may-say-toc-1-600x600.jpg](https://cdn.tgdd.vn/Products/Images/4926/307896/TimerThumb/may-say-toc-1-600x600.jpg)",
  },
  {
    id: 26,
    name: "Máy sấy tóc Panasonic",
    category: "Máy sấy",
    salePrice: 400000,
    originalPrice: 500000,
    rating: 4,
    sold: 210,
    image:
      "[https://cdn.tgdd.vn/Products/Images/4926/307897/TimerThumb/may-say-toc-panasonic-1-600x600.jpg](https://cdn.tgdd.vn/Products/Images/4926/307897/TimerThumb/may-say-toc-panasonic-1-600x600.jpg)",
  },
  {
    id: 27,
    name: "Máy sấy tóc Lock&Lock",
    category: "Máy sấy",
    salePrice: 420000,
    originalPrice: 520000,
    rating: 4,
    sold: 180,
    image:
      "[https://cdn.tgdd.vn/Products/Images/4926/307898/TimerThumb/may-say-toc-locklock-1-600x600.jpg](https://cdn.tgdd.vn/Products/Images/4926/307898/TimerThumb/may-say-toc-locklock-1-600x600.jpg)",
  },
  {
    id: 28,
    name: "Máy sấy tóc Tefal",
    category: "Máy sấy",
    salePrice: 390000,
    originalPrice: 490000,
    rating: 4,
    sold: 150,
    image:
      "[https://cdn.tgdd.vn/Products/Images/4926/307899/TimerThumb/may-say-toc-tefal-1-600x600.jpg](https://cdn.tgdd.vn/Products/Images/4926/307899/TimerThumb/may-say-toc-tefal-1-600x600.jpg)",
  },
  {
    id: 29,
    name: "Máy sấy tóc Bluestone",
    category: "Máy sấy",
    salePrice: 410000,
    originalPrice: 510000,
    rating: 4,
    sold: 120,
    image:
      "[https://cdn.tgdd.vn/Products/Images/4926/307900/TimerThumb/may-say-toc-bluestone-1-600x600.jpg](https://cdn.tgdd.vn/Products/Images/4926/307900/TimerThumb/may-say-toc-bluestone-1-600x600.jpg)",
  },
  {
    id: 30,
    name: "Máy sấy tóc Kangaroo",
    category: "Máy sấy",
    salePrice: 380000,
    originalPrice: 480000,
    rating: 4,
    sold: 90,
    image:
      "[https://cdn.tgdd.vn/Products/Images/4926/307901/TimerThumb/may-say-toc-kangaroo-1-600x600.jpg](https://cdn.tgdd.vn/Products/Images/4926/307901/TimerThumb/may-say-toc-kangaroo-1-600x600.jpg)",
  },

  // Máy lọc nước
  {
    id: 31,
    name: "Máy lọc nước Kangaroo",
    category: "Máy lọc nước",
    salePrice: 3490000,
    originalPrice: 3990000,
    rating: 4,
    sold: 210,
    image:
      "[https://cdn.tgdd.vn/Products/Images/4927/307895/TimerThumb/may-loc-nuoc-1-600x600.jpg](https://cdn.tgdd.vn/Products/Images/4927/307895/TimerThumb/may-loc-nuoc-1-600x600.jpg)",
  },
  {
    id: 32,
    name: "Máy lọc nước Karofi",
    category: "Máy lọc nước",
    salePrice: 3990000,
    originalPrice: 4490000,
    rating: 5,
    sold: 180,
    image:
      "[https://cdn.tgdd.vn/Products/Images/4927/307896/TimerThumb/may-loc-nuoc-karofi-1-600x600.jpg](https://cdn.tgdd.vn/Products/Images/4927/307896/TimerThumb/may-loc-nuoc-karofi-1-600x600.jpg)",
  },
  {
    id: 33,
    name: "Máy lọc nước Sunhouse",
    category: "Máy lọc nước",
    salePrice: 3690000,
    originalPrice: 4190000,
    rating: 4,
    sold: 150,
    image:
      "[https://cdn.tgdd.vn/Products/Images/4927/307897/TimerThumb/may-loc-nuoc-sunhouse-1-600x600.jpg](https://cdn.tgdd.vn/Products/Images/4927/307897/TimerThumb/may-loc-nuoc-sunhouse-1-600x600.jpg)",
  },
  {
    id: 34,
    name: "Máy lọc nước AO Smith",
    category: "Máy lọc nước",
    salePrice: 4190000,
    originalPrice: 4690000,
    rating: 5,
    sold: 120,
    image:
      "[https://cdn.tgdd.vn/Products/Images/4927/307898/TimerThumb/may-loc-nuoc-aosmith-1-600x600.jpg](https://cdn.tgdd.vn/Products/Images/4927/307898/TimerThumb/may-loc-nuoc-aosmith-1-600x600.jpg)",
  },
  {
    id: 35,
    name: "Máy lọc nước Electrolux",
    category: "Máy lọc nước",
    salePrice: 3790000,
    originalPrice: 4290000,
    rating: 4,
    sold: 90,
    image:
      "[https://cdn.tgdd.vn/Products/Images/4927/307899/TimerThumb/may-loc-nuoc-electrolux-1-600x600.jpg](https://cdn.tgdd.vn/Products/Images/4927/307899/TimerThumb/may-loc-nuoc-electrolux-1-600x600.jpg)",
  },
  {
    id: 36,
    name: "Máy lọc nước Toshiba",
    category: "Máy lọc nước",
    salePrice: 3890000,
    originalPrice: 4390000,
    rating: 4,
    sold: 70,
    image:
      "[https://cdn.tgdd.vn/Products/Images/4927/307900/TimerThumb/may-loc-nuoc-toshiba-1-600x600.jpg](https://cdn.tgdd.vn/Products/Images/4927/307900/TimerThumb/may-loc-nuoc-toshiba-1-600x600.jpg)",
  },

  // Bếp âm
  {
    id: 37,
    name: "Bếp âm Teka",
    category: "Bếp âm",
    salePrice: 5990000,
    originalPrice: 6990000,
    rating: 5,
    sold: 90,
    image:
      "[https://cdn.tgdd.vn/Products/Images/4928/307899/TimerThumb/bep-am-tot-1-600x600.jpg](https://cdn.tgdd.vn/Products/Images/4928/307899/TimerThumb/bep-am-tot-1-600x600.jpg)",
  },
  {
    id: 38,
    name: "Bếp âm Faster",
    category: "Bếp âm",
    salePrice: 5490000,
    originalPrice: 6490000,
    rating: 4,
    sold: 80,
    image:
      "[https://cdn.tgdd.vn/Products/Images/4928/307900/TimerThumb/bep-am-faster-1-600x600.jpg](https://cdn.tgdd.vn/Products/Images/4928/307900/TimerThumb/bep-am-faster-1-600x600.jpg)",
  },
  {
    id: 39,
    name: "Bếp âm Chefs",
    category: "Bếp âm",
    salePrice: 5990000,
    originalPrice: 6990000,
    rating: 5,
    sold: 70,
    image:
      "[https://cdn.tgdd.vn/Products/Images/4928/307901/TimerThumb/bep-am-chefs-1-600x600.jpg](https://cdn.tgdd.vn/Products/Images/4928/307901/TimerThumb/bep-am-chefs-1-600x600.jpg)",
  },
  {
    id: 40,
    name: "Bếp âm Giovani",
    category: "Bếp âm",
    salePrice: 5690000,
    originalPrice: 6690000,
    rating: 4,
    sold: 60,
    image:
      "[https://cdn.tgdd.vn/Products/Images/4928/307902/TimerThumb/bep-am-giovani-1-600x600.jpg](https://cdn.tgdd.vn/Products/Images/4928/307902/TimerThumb/bep-am-giovani-1-600x600.jpg)",
  },
  {
    id: 41,
    name: "Bếp âm Bosch",
    category: "Bếp âm",
    salePrice: 6290000,
    originalPrice: 7290000,
    rating: 5,
    sold: 50,
    image:
      "[https://cdn.tgdd.vn/Products/Images/4928/307903/TimerThumb/bep-am-bosch-1-600x600.jpg](https://cdn.tgdd.vn/Products/Images/4928/307903/TimerThumb/bep-am-bosch-1-600x600.jpg)",
  },
  {
    id: 42,
    name: "Bếp âm Canzy",
    category: "Bếp âm",
    salePrice: 5790000,
    originalPrice: 6790000,
    rating: 4,
    sold: 40,
    image:
      "[https://cdn.tgdd.vn/Products/Images/4928/307904/TimerThumb/bep-am-canzy-1-600x600.jpg](https://cdn.tgdd.vn/Products/Images/4928/307904/TimerThumb/bep-am-canzy-1-600x600.jpg)",
  },
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
  { path: "/admin/statistics", label: "Thống kê hệ thống", icon: BarChart4 },
  // Cấu hình
  { path: "/admin/settings", label: "Cài đặt hệ thống", icon: Settings },
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
    path: "/manager/revenue",
    label: "Doanh thu chi nhánh",
    icon: BarChart,
  },
  {
    path: "/manager/top-products",
    label: "Hàng bán chạy",
    icon: Star,
  },
  {
    path: "/manager/orders",
    label: "Hóa đơn & lợi nhuận",
    icon: FileText, // hóa đơn + lợi nhuận + chi phí
  },
  {
    path: "/manager/reviews",
    label: "Đánh giá khách hàng",
    icon: MessageSquare,
  },
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
  { path: "/staff/invoice", label: "Hóa đơn bán hàng", icon: FileText },
  { path: "/staff/orders", label: "Xử lý đơn online", icon: PackageCheck },
  { path: "/staff/support", label: "Tư vấn & hỗ trợ", icon: MessageSquare },
  { path: "/staff/exchange", label: "Đổi trả / bảo hành", icon: RotateCcw },
  { path: "/staff/history", label: "Lịch sử giao dịch", icon: History },
];
