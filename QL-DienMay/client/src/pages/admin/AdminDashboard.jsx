import { useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { Bar, Pie } from "react-chartjs-2";
import { ShoppingBag, Layers, Users, Truck } from "lucide-react";
import Meta from "../../components/Meta";

// Register chart plugins
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

export default function AdminDashboard() {
  const [stats] = useState({
    products: 120,
    categories: 15,
    suppliers: 8,
    customers: 200,
  });

  const barData = {
    labels: ["Rau quả", "Sữa", "Đồ uống", "TP chức năng"],
    datasets: [
      {
        label: "Sản phẩm",
        data: [40, 25, 35, 20],
        backgroundColor: "rgba(56, 189, 248, 0.8)", // sky-400
        borderRadius: 8,
      },
    ],
  };

  const pieData = {
    labels: ["Normal", "Silver", "Gold", "VIP"],
    datasets: [
      {
        label: "Khách hàng",
        data: [120, 50, 20, 10],
        backgroundColor: ["#D1FAE5", "#6EE7B7", "#10B981", "#047857"],
      },
    ],
  };

  return (
    <div className="p-8 flex-1 bg-linear-to-br from-slate-100 to-slate-200 min-h-screen">
      <Meta title="Admin Dashboard" />

      {/* Header */}
      <div className="mb-10">
        <h1 className="text-4xl font-extrabold text-gray-800 tracking-wide">
          Bảng điều khiển
        </h1>
        <p className="text-gray-600 mt-1 text-lg">
          Tổng quan hệ thống & thông kê dữ liệu cửa hàng
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-8 mb-10">
        {/* CARD TEMPLATE */}
        <div className="bg-linear-to-br from-blue-500 to-blue-400 text-white p-6 rounded-2xl shadow-xl hover:scale-[1.03] transition-all duration-300 cursor-pointer">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-80">Sản phẩm</p>
              <h2 className="text-3xl font-bold mt-1">{stats.products}</h2>
            </div>
            <ShoppingBag size={42} className="opacity-80" />
          </div>
        </div>

        <div className="bg-linear-to-br from-emerald-500 to-emerald-400 text-white p-6 rounded-2xl shadow-xl hover:scale-[1.03] transition-all duration-300 cursor-pointer">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-80">Danh mục</p>
              <h2 className="text-3xl font-bold mt-1">{stats.categories}</h2>
            </div>
            <Layers size={42} className="opacity-80" />
          </div>
        </div>

        <div className="bg-linear-to-br from-amber-500 to-amber-400 text-white p-6 rounded-2xl shadow-xl hover:scale-[1.03] transition-all duration-300 cursor-pointer">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-80">Nhà cung cấp</p>
              <h2 className="text-3xl font-bold mt-1">{stats.suppliers}</h2>
            </div>
            <Truck size={42} className="opacity-80" />
          </div>
        </div>

        <div className="bg-linear-to-br from-purple-500 to-purple-400 text-white p-6 rounded-2xl shadow-xl hover:scale-[1.03] transition-all duration-300 cursor-pointer">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-80">Khách hàng</p>
              <h2 className="text-3xl font-bold mt-1">{stats.customers}</h2>
            </div>
            <Users size={42} className="opacity-80" />
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* BAR CHART */}
        <div className="bg-white/70 backdrop-blur-md p-8 rounded-2xl shadow-xl border border-white/50">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">
            Sản phẩm theo danh mục
          </h2>
          <Bar
            data={barData}
            options={{
              responsive: true,
              plugins: { legend: { display: false } },
            }}
          />
        </div>

        {/* PIE CHART */}
        <div className="bg-white/70 backdrop-blur-md p-8 rounded-2xl shadow-xl border border-white/50">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">
            Tỷ lệ khách hàng theo hạng
          </h2>
          <Pie
            data={pieData}
            options={{
              responsive: true,
              plugins: { legend: { position: "bottom" } },
            }}
          />
        </div>
      </div>
    </div>
  );
}
