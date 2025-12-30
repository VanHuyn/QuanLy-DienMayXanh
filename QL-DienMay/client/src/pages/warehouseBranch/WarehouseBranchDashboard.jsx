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
import { Boxes, Package, Truck, AlertCircle } from "lucide-react";
import Meta from "../../components/Meta";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function BranchWarehouseDashboard() {
  // ✅ Fake data tạm
  const [stats] = useState({
    totalInventory: 1240, // tổng tồn kho chi nhánh
    productTypes: 68, // số loại sản phẩm
    exportOrders: 32, // phiếu xuất bán hàng
    nearExpiry: 14, // số sản phẩm gần hết/hết hạn
  });

  const barData = {
    labels: ["T2", "T3", "T4", "T5", "T6", "T7", "CN"],
    datasets: [
      {
        label: "Nhập kho",
        data: [20, 25, 18, 30, 28, 35, 32],
        backgroundColor: "rgba(34, 197, 94, 0.85)",
        borderRadius: 8,
      },
      {
        label: "Xuất kho",
        data: [15, 18, 12, 22, 20, 25, 23],
        backgroundColor: "rgba(59, 130, 246, 0.85)",
        borderRadius: 8,
      },
    ],
  };

  return (
    <div className="p-8 flex-1 bg-linear-to-br from-slate-100 to-slate-200 min-h-screen">
      <Meta title="Branch Warehouse Dashboard" />

      {/* Header */}
      <div className="mb-10">
        <h1 className="text-4xl font-extrabold text-gray-800 tracking-wide">
          Dashboard kho chi nhánh
        </h1>
        <p className="text-gray-600 mt-1 text-lg">
          Tổng quan tồn kho và xuất nhập tại kho chi nhánh
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
              <p className="text-sm opacity-80">Phiếu xuất bán hàng</p>
              <h2 className="text-3xl font-bold mt-1">{stats.exportOrders}</h2>
            </div>
            <Truck size={42} className="opacity-80" />
          </div>
        </div>

        <div className="bg-linear-to-br from-red-500 to-red-400 text-white p-6 rounded-2xl shadow-xl hover:scale-[1.03] transition-all">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-80">Hàng gần hết/hết hạn</p>
              <h2 className="text-3xl font-bold mt-1">{stats.nearExpiry}</h2>
            </div>
            <AlertCircle size={42} className="opacity-80" />
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
