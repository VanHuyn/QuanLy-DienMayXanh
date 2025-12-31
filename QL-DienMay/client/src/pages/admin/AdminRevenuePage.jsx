// AdminRevenuePage.jsx
import { useEffect, useState } from "react";
import { useRevenue } from "../../context/RevenueContext";
import Meta from "../../components/Meta";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function AdminRevenuePage() {
  const { adminRevenue, dailyRevenue, fetchAdminRevenue, fetchDailyRevenue, loading } = useRevenue();
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });

  // Load dữ liệu khi component mount
  useEffect(() => {
    fetchAdminRevenue();
    fetchDailyRevenue();
  }, []);

  // Chuẩn hóa dữ liệu cho chart khi dailyRevenue thay đổi
  useEffect(() => {
    if (!dailyRevenue || dailyRevenue.length === 0) return;

    const labels = dailyRevenue.map((d) => d.Ngay || "N/A");
    const data = dailyRevenue.map((d) => Number(d.DoanhThu) || 0);

    setChartData({
      labels,
      datasets: [
        {
          label: "Doanh thu (VND)",
          data,
          borderColor: "#4ade80",
          backgroundColor: "rgba(74, 222, 128, 0.2)",
          tension: 0.3,
          fill: true,
        },
      ],
    });
  }, [dailyRevenue]);

  // Options cho chart
  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      tooltip: {
        callbacks: {
          label: function (context) {
            let value = context.raw || 0;
            return value.toLocaleString("vi-VN") + " VND";
          },
        },
      },
    },
    scales: {
      y: {
        ticks: {
          callback: function (value) {
            return value.toLocaleString("vi-VN");
          },
        },
      },
    },
  };

  return (
    <div className="p-6 min-h-screen bg-gray-100">
      <Meta title="Thống kê doanh thu Admin" />
      <h1 className="text-2xl font-bold mb-6">Thống kê doanh thu Admin</h1>

      {/* Tổng doanh thu */}
      <div className="bg-white shadow-md rounded-xl p-6 mb-6">
        <h2 className="text-lg font-semibold text-gray-700 mb-2">Tổng doanh thu toàn hệ thống</h2>
        {loading ? (
          <p className="text-gray-500">Đang tải...</p>
        ) : (
          <p className="text-2xl font-bold text-green-600">
            {(Number(adminRevenue) || 0).toLocaleString("vi-VN")} VND
          </p>
        )}
      </div>

      {/* Biểu đồ doanh thu theo ngày */}
      <div className="bg-white shadow-md rounded-xl p-6 mb-6" style={{ height: 350 }}>
        <h2 className="text-lg font-semibold text-gray-700 mb-2">Doanh thu theo ngày</h2>
        {loading ? (
          <p className="text-gray-500">Đang tải...</p>
        ) : dailyRevenue?.length === 0 ? (
          <p className="text-gray-500">Chưa có dữ liệu</p>
        ) : (
          <Line data={chartData} options={chartOptions} />
        )}
      </div>

      {/* Bảng doanh thu theo ngày */}
      <div className="bg-white shadow-md rounded-xl p-6">
        <h2 className="text-lg font-semibold text-gray-700 mb-2">Bảng doanh thu theo ngày</h2>
        {loading ? (
          <p className="text-gray-500">Đang tải...</p>
        ) : dailyRevenue?.length === 0 ? (
          <p className="text-gray-500">Chưa có dữ liệu</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm border">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="p-3 text-left">Ngày</th>
                  <th className="p-3 text-right">Doanh thu (VND)</th>
                </tr>
              </thead>
              <tbody>
                {dailyRevenue.map((item, idx) => (
                  <tr key={idx} className="border-b hover:bg-gray-50">
                    <td className="p-3">{item.Ngay || "N/A"}</td>
                    <td className="p-3 text-right font-semibold">
                      {(Number(item.DoanhThu) || 0).toLocaleString("vi-VN")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
