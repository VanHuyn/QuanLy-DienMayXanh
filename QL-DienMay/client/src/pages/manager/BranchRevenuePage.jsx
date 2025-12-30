import { useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar, Line } from "react-chartjs-2";
import { CalendarDays, Wallet } from "lucide-react";
import Meta from "../../components/Meta";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

export default function BranchRevenuePage() {
  const [summary] = useState({
    today: 45000000,
    month: 980000000,
    orders: 128,
  });

  const barData = {
    labels: ["Tuần 1", "Tuần 2", "Tuần 3", "Tuần 4"],
    datasets: [
      {
        label: "Doanh thu (triệu)",
        data: [220, 250, 270, 240],
        backgroundColor: "rgba(59, 130, 246, 0.85)",
        borderRadius: 10,
      },
    ],
  };

  const lineData = {
    labels: ["T2", "T3", "T4", "T5", "T6", "T7", "CN"],
    datasets: [
      {
        label: "Doanh thu ngày (triệu)",
        data: [32, 40, 38, 45, 50, 60, 55],
        borderColor: "#10B981",
        backgroundColor: "rgba(16, 185, 129, 0.2)",
        tension: 0.4,
        fill: true,
      },
    ],
  };

  return (
    <div className="p-8 flex-1 bg-linear-to-br from-slate-100 to-slate-200 min-h-screen">
      <Meta title="Doanh thu chi nhánh" />

      {/* Header */}
      <div className="mb-10">
        <h1 className="text-4xl font-extrabold text-gray-800 tracking-wide">
          Doanh thu chi nhánh
        </h1>
        <p className="text-gray-600 mt-1 text-lg">
          Theo dõi doanh thu, đơn hàng theo thời gian
        </p>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8 mb-10">
        <div className="bg-linear-to-br from-emerald-500 to-emerald-400 text-white p-6 rounded-2xl shadow-xl">
          <p className="text-sm opacity-80">Doanh thu hôm nay</p>
          <h2 className="text-3xl font-bold mt-2">
            {summary.today.toLocaleString()} ₫
          </h2>
        </div>

        <div className="bg-linear-to-br from-blue-500 to-blue-400 text-white p-6 rounded-2xl shadow-xl">
          <p className="text-sm opacity-80">Doanh thu tháng</p>
          <h2 className="text-3xl font-bold mt-2">
            {summary.month.toLocaleString()} ₫
          </h2>
        </div>

        <div className="bg-linear-to-br from-purple-500 to-purple-400 text-white p-6 rounded-2xl shadow-xl">
          <p className="text-sm opacity-80">Đơn hàng</p>
          <h2 className="text-3xl font-bold mt-2">{summary.orders}</h2>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white/70 backdrop-blur-md p-8 rounded-2xl shadow-xl border border-white/50">
          <h2 className="text-xl font-semibold mb-4 text-gray-700 flex items-center gap-2">
            <CalendarDays size={20} /> Doanh thu theo ngày
          </h2>
          <Line data={lineData} />
        </div>

        <div className="bg-white/70 backdrop-blur-md p-8 rounded-2xl shadow-xl border border-white/50">
          <h2 className="text-xl font-semibold mb-4 text-gray-700 flex items-center gap-2">
            <Wallet size={20} /> Doanh thu theo tuần
          </h2>
          <Bar
            data={barData}
            options={{ plugins: { legend: { display: false } } }}
          />
        </div>
      </div>
    </div>
  );
}
