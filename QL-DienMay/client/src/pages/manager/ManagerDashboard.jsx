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
import { BarChart3, Boxes, Users, Truck } from "lucide-react";
import Meta from "../../components/Meta";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function ManagerDashboard() {
  const [stats] = useState({
    revenueToday: 45000000,
    ordersToday: 128,
    inventory: 1240,
    staff: 18,
  });

  const barData = {
    labels: ["T2", "T3", "T4", "T5", "T6", "T7", "CN"],
    datasets: [
      {
        label: "Doanh thu (triệu)",
        data: [32, 40, 38, 45, 50, 60, 55],
        backgroundColor: "rgba(34, 197, 94, 0.85)",
        borderRadius: 8,
      },
    ],
  };

  return (
    <div className="p-8 flex-1 bg-linear-to-br from-slate-100 to-slate-200 min-h-screen">
      <Meta title="Branch Manager Dashboard" />

      {/* Header */}
      <div className="mb-10">
        <h1 className="text-4xl font-extrabold text-gray-800 tracking-wide">
          Dashboard chi nhánh
        </h1>
        <p className="text-gray-600 mt-1 text-lg">
          Tổng quan hoạt động & hiệu suất chi nhánh
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-8 mb-10">
        <div className="bg-linear-to-br from-emerald-500 to-emerald-400 text-white p-6 rounded-2xl shadow-xl hover:scale-[1.03] transition-all">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-80">Doanh thu hôm nay</p>
              <h2 className="text-3xl font-bold mt-1">
                {stats.revenueToday.toLocaleString()} ₫
              </h2>
            </div>
            <BarChart3 size={42} className="opacity-80" />
          </div>
        </div>

        <div className="bg-linear-to-br from-blue-500 to-blue-400 text-white p-6 rounded-2xl shadow-xl hover:scale-[1.03] transition-all">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-80">Đơn hàng hôm nay</p>
              <h2 className="text-3xl font-bold mt-1">{stats.ordersToday}</h2>
            </div>
            <Truck size={42} className="opacity-80" />
          </div>
        </div>

        <div className="bg-linear-to-br from-amber-500 to-amber-400 text-white p-6 rounded-2xl shadow-xl hover:scale-[1.03] transition-all">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-80">Tồn kho</p>
              <h2 className="text-3xl font-bold mt-1">{stats.inventory}</h2>
            </div>
            <Boxes size={42} className="opacity-80" />
          </div>
        </div>

        <div className="bg-linear-to-br from-purple-500 to-purple-400 text-white p-6 rounded-2xl shadow-xl hover:scale-[1.03] transition-all">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-80">Nhân viên</p>
              <h2 className="text-3xl font-bold mt-1">{stats.staff}</h2>
            </div>
            <Users size={42} className="opacity-80" />
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="bg-white/70 backdrop-blur-md p-8 rounded-2xl shadow-xl border border-white/50">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">
          Doanh thu theo tuần
        </h2>
        <Bar
          data={barData}
          options={{ responsive: true, plugins: { legend: { display: false } } }}
        />
      </div>
    </div>
  );
}