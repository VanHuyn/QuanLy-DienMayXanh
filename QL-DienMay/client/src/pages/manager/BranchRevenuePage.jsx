// BranchRevenuePage.jsx
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
import useAuth from "../../hooks/useAuth";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function BranchRevenuePage() {
  const { user } = useAuth();
  const { branchRevenue, fetchBranchRevenue, loading } = useRevenue();
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });

  // Lấy dữ liệu khi mount
  useEffect(() => {
    if (user?.ChiNhanh?.Id) fetchBranchRevenue(user.ChiNhanh.Id);
  }, []);

  // Chuẩn hóa dữ liệu chart
  useEffect(() => {
    const revenueArray = Array.isArray(branchRevenue) ? branchRevenue : [];
    if (revenueArray.length === 0) return;

    const labels = revenueArray.map((d) => d.ngay);
    const data = revenueArray.map((d) => Number(d.doanhThu) || 0);

    setChartData({
      labels,
      datasets: [
        {
          label: "Doanh thu (VND)",
          data,
          borderColor: "#4ade80",
          backgroundColor: "rgba(74, 222, 128, 0.2)",
          fill: true,
          tension: 0.3,
          pointRadius: 4,
          pointHoverRadius: 6,
        },
      ],
    });
  }, [branchRevenue]);

  // Tính tổng doanh thu
  const revenueArray = Array.isArray(branchRevenue) ? branchRevenue : [];
  const totalRevenue = revenueArray.reduce(
    (sum, d) => sum + Number(d.doanhThu || 0),
    0
  );

  return (
    <div className="p-6">
      <Meta title="Doanh thu chi nhánh" />
      <h1 className="text-2xl font-bold mb-4">Thống kê doanh thu chi nhánh</h1>

      {/* Tổng doanh thu */}
      <div className="bg-white shadow-md rounded-xl p-6 mb-6">
        <h2 className="text-lg font-semibold mb-2">Tổng doanh thu chi nhánh</h2>
        {loading ? (
          <p className="text-gray-500">Đang tải...</p>
        ) : (
          <p className="text-2xl font-bold text-green-600">
            {totalRevenue.toLocaleString()} VND
          </p>
        )}
      </div>

      {/* Biểu đồ doanh thu */}
      <div
        className="bg-white shadow-md rounded-xl p-6 mb-6"
        style={{ height: 350 }}
      >
        <h2 className="text-lg font-semibold mb-2">Doanh thu theo ngày</h2>
        {loading ? (
          <p className="text-gray-500">Đang tải...</p>
        ) : revenueArray.length === 0 ? (
          <p className="text-gray-500">Chưa có dữ liệu</p>
        ) : (
          <Line
            data={chartData}
            options={{
              responsive: true,
              plugins: {
                legend: { position: "top" },
                tooltip: {
                  callbacks: {
                    label: (context) =>
                      (context.raw || 0).toLocaleString() + " VND",
                  },
                },
              },
              scales: {
                y: {
                  ticks: {
                    callback: (value) => value.toLocaleString(),
                  },
                },
              },
            }}
          />
        )}
      </div>

      {/* Bảng chi tiết */}
      <div className="bg-white shadow-md rounded-xl p-6">
        <h2 className="text-lg font-semibold mb-2">Bảng doanh thu theo ngày</h2>
        {loading ? (
          <p className="text-gray-500">Đang tải...</p>
        ) : revenueArray.length === 0 ? (
          <p className="text-gray-500">Chưa có dữ liệu</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm border">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="p-3 text-left">Ngày</th>
                  <th className="p-3 text-left">Chi nhánh</th>
                  <th className="p-3 text-right">Doanh thu (VND)</th>
                </tr>
              </thead>
              <tbody>
                {revenueArray.map((item, idx) => (
                  <tr key={idx} className="border-b hover:bg-gray-50">
                    <td className="p-3">{item?.ngay}</td>
                    <td className="p-3">{item?.tenChiNhanh}</td>
                    <td className="p-3 text-right font-semibold">
                      {Number(item?.doanhThu || 0).toLocaleString()}
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
