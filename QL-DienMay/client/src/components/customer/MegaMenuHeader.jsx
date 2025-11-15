import { useState } from "react";
import { ChevronRight, ChevronDown } from "lucide-react";

export default function MegaMenuHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState(null);

  const menuData = [
    {
      title: "Chương trình hot",
      groups: [
        {
          name: "Khuyến mãi",
          items: ["Giảm giá khủng", "Trả góp 0%", "Mua 1 tặng 1"],
        },
        {
          name: "Sự kiện",
          items: ["Sinh nhật vàng", "Flash Sale", "Deal giờ vàng"],
        },
      ],
    },
    {
      title: "Điện gia dụng",
      groups: [
        {
          name: "Nhà bếp",
          items: ["Nồi cơm điện", "Lò vi sóng", "Máy xay sinh tố", "Bếp từ"],
        },
        {
          name: "Chăm sóc nhà cửa",
          items: ["Máy hút bụi", "Bàn ủi", "Quạt", "Máy lọc không khí"],
        },
      ],
    },
    {
      title: "Điện tử - Tivi",
      groups: [
        {
          name: "Tivi & Màn hình",
          items: ["Smart TV", "Android TV", "OLED TV", "Màn hình cong"],
        },
        {
          name: "Âm thanh",
          items: ["Loa Bluetooth", "Soundbar", "Amply", "Dàn karaoke"],
        },
      ],
    },
  ];

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => {
        setIsOpen(false);
        setActiveCategory(null);
      }}
    >
      {/* Nút Danh mục */}
      <button className="flex items-center gap-2 bg-[#0066cc] px-5 py-2.5 rounded-md text-white font-semibold hover:bg-[#0052a3] transition-all duration-200 shadow-md border border-blue-700">
        <span className="text-lg">☰</span>
        <span>Danh mục</span>
        <ChevronDown size={16} />
      </button>

      {/* Bridge trong suốt để tránh mất hover khi di chuột */}
      {isOpen && (
        <div className="absolute top-full left-0 w-[260px] h-3 bg-transparent z-40"></div>
      )}

      {isOpen && (
        <div className="absolute top-[calc(100%+0.75rem)] left-0 flex z-50 animate-fadeIn">
          {/* Menu cấp 1 */}
          <div className="bg-white text-gray-800 w-[260px] shadow-lg rounded-l-md border border-gray-200 overflow-hidden">
            {menuData.map((item, index) => (
              <div
                key={index}
                onMouseEnter={() => setActiveCategory(item.title)}
                className={`flex items-center justify-between px-4 py-3 text-sm font-medium cursor-pointer border-b border-gray-100 transition-all duration-150 ${
                  activeCategory === item.title
                    ? "bg-blue-50 text-blue-600 border-l-4 border-blue-500"
                    : "hover:bg-gray-50"
                }`}
              >
                <span>{item.title}</span>
                <ChevronRight size={16} />
              </div>
            ))}
          </div>

          {/* Mega menu */}
          {activeCategory && (
            <div className="bg-white text-gray-800 w-[740px] shadow-lg rounded-r-md border border-gray-200 border-l-0 p-5 animate-slideIn">
              <div className="grid grid-cols-2 gap-8">
                {menuData
                  .find((cat) => cat.title === activeCategory)
                  ?.groups.map((group, gi) => (
                    <div key={gi}>
                      <h4 className="font-semibold text-blue-600 mb-2 border-b border-blue-100 pb-1">
                        {group.name}
                      </h4>
                      <ul className="space-y-1.5">
                        {group.items.map((item, ii) => (
                          <li
                            key={ii}
                            className="cursor-pointer hover:text-blue-500 transition-colors text-sm"
                          >
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
              </div>

              {/* Banner / quảng cáo */}
              <div className="mt-5 border-t pt-4">
                <img
                  src="https://cdnv2.tgdd.vn/mwg-static/dmx/Banner/6f/01/6f01c5953cd173ee442dc43dd079ca95.png"
                  alt="Khuyến mãi"
                  className="w-full h-32 object-cover rounded-md shadow-sm hover:shadow-md transition-transform hover:scale-[1.02]"
                />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
