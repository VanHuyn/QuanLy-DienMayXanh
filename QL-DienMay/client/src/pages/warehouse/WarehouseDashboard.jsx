import { useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { Boxes, Archive, Truck, Package } from "lucide-react";
import Meta from "../../components/Meta";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function WarehouseDashboard() {
  // ✅ Fake data tạm
  const [stats] = useState({
    totalInventory: 5340, // tổng tồn kho
    productTypes: 124, // số loại sản phẩm
    importOrders: 45, // phiếu nhập hàng từ NCC
    exportOrders: 32, // phiếu xuất đi chi nhánh
  });

  const barData = {
    labels: ["T2", "T3", "T4", "T5", "T6", "T7", "CN"],
    datasets: [
      {
        label: "Nhập kho",
        data: [50, 60, 45, 70, 65, 80, 75],
        backgroundColor: "rgba(34, 197, 94, 0.85)",
        borderRadius: 8,
      },
      {
        label: "Xuất kho",
        data: [30, 35, 25, 40, 38, 50, 45],
        backgroundColor: "rgba(59, 130, 246, 0.85)",
        borderRadius: 8,
      },
    ],
  };

  return (
    <div className="p-8 flex-1 bg-linear-to-br from-slate-100 to-slate-200 min-h-screen">
      <Meta title="Warehouse Dashboard" />

      {/* Header */}
      <div className="mb-10">
        <h1 className="text-4xl font-extrabold text-gray-800 tracking-wide">
          Dashboard kho tổng
        </h1>
        <p className="text-gray-600 mt-1 text-lg">
          Tổng quan nhập xuất và tồn kho kho tổng
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-8 mb-10">
        <div className="bg-linear-to-br from-emerald-500 to-emerald-400 text-white p-6 rounded-2xl shadow-xl hover:scale-[1.03] transition-all">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-80">Tổng tồn kho</p>
              <h2 className="text-3xl font-bold mt-1">{stats.totalInventory}</h2>
            </div>
            <Boxes size={42} className="opacity-80" />
          </div>
        </div>

        <div className="bg-linear-to-br from-amber-500 to-amber-400 text-white p-6 rounded-2xl shadow-xl hover:scale-[1.03] transition-all">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-80">Số loại sản phẩm</p>
              <h2 className="text-3xl font-bold mt-1">{stats.productTypes}</h2>
            </div>
            <Package size={42} className="opacity-80" />
          </div>
        </div>

        <div className="bg-linear-to-br from-blue-500 to-blue-400 text-white p-6 rounded-2xl shadow-xl hover:scale-[1.03] transition-all">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-80">Phiếu nhập từ NCC</p>
              <h2 className="text-3xl font-bold mt-1">{stats.importOrders}</h2>
            </div>
            <Archive size={42} className="opacity-80" />
          </div>
        </div>

        <div className="bg-linear-to-br from-purple-500 to-purple-400 text-white p-6 rounded-2xl shadow-xl hover:scale-[1.03] transition-all">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-80">Phiếu xuất đi chi nhánh</p>
              <h2 className="text-3xl font-bold mt-1">{stats.exportOrders}</h2>
            </div>
            <Truck size={42} className="opacity-80" />
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="bg-white/70 backdrop-blur-md p-8 rounded-2xl shadow-xl border border-white/50">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">
          Nhập - Xuất theo tuần
        </h2>
        <Bar
          data={barData}
          options={{
            responsive: true,
            plugins: {
              legend: { position: "top" },
            },
          }}
        />
      </div>
    </div>
  );
}
