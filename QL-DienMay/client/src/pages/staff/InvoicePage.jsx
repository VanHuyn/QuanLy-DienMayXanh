import { useEffect, useState, useMemo } from "react";
import { useInvoice } from "../../context/InvoiceContext";
import useAuth from "../../hooks/useAuth";
import Meta from "../../components/Meta";
import { utils, writeFile } from "xlsx";

const STATUS_OPTIONS = [
  { label: "Tất cả", value: "" },
  { label: "Đã hoàn tất", value: "DaHoanTat" },
  { label: "Chờ xác nhận", value: "ChoXacNhan" },
  { label: "Đã hủy", value: "DaHuy" },
];

export default function InvoicePage() {
  const { user } = useAuth();
  const { invoices, loading, fetchInvoices, fetchInvoiceById, invoiceDetail } =
    useInvoice();

  const [selectedInvoiceId, setSelectedInvoiceId] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  useEffect(() => {
    if (user?.ChiNhanh?.Id) {
      fetchInvoices({ ChiNhanhId: user.ChiNhanh.Id });
    }
  }, [user]);

  const handleSelectInvoice = (id) => {
    setSelectedInvoiceId(id);
    fetchInvoiceById(id);
  };

  const statusColor = (status) => {
    switch (status) {
      case "DaHoanTat":
        return "bg-green-100 text-green-800";
      case "ChoXacNhan":
        return "bg-yellow-100 text-yellow-800";
      case "DaHuy":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const filteredInvoices = useMemo(() => {
    let list = invoices || [];
    if (statusFilter) list = list.filter((i) => i.TrangThai === statusFilter);
    if (searchText)
      list = list.filter(
        (i) =>
          i.Ma?.toLowerCase().includes(searchText.toLowerCase()) ||
          i.KhachHang?.NguoiDung?.HoTen?.toLowerCase().includes(
            searchText.toLowerCase()
          )
      );
    return list;
  }, [invoices, statusFilter, searchText]);

  const paginatedInvoices = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredInvoices.slice(start, start + pageSize);
  }, [filteredInvoices, currentPage]);

  const totalPages = Math.ceil(filteredInvoices.length / pageSize);

  // Xuất Excel
  const handleExportExcel = () => {
    if (!invoiceDetail) return;

    const invoiceInfo = [
      ["HÓA ĐƠN:", invoiceDetail.Ma || `#${invoiceDetail.Id}`],
      ["Khách hàng:", invoiceDetail.KhachHang?.NguoiDung?.HoTen || "Khách vãng lai"],
      ["Email:", invoiceDetail.KhachHang?.NguoiDung?.Email || "-"],
      ["Số điện thoại:", invoiceDetail.KhachHang?.NguoiDung?.SoDienThoai || "-"],
      ["Địa chỉ:", `${invoiceDetail.TinhThanh}, ${invoiceDetail.QuanHuyen}, ${invoiceDetail.XaPhuong}, ${invoiceDetail.DiaChiChiTiet}`],
      ["Ngày đặt:", new Date(invoiceDetail.NgayDat).toLocaleDateString()],
      ["Tổng tiền:", Number(invoiceDetail.TongTien).toLocaleString() + " VND"],
      ["Phương thức thanh toán:", invoiceDetail.PhuongThucThanhToan || "-"],
      ["Trạng thái:", invoiceDetail.TrangThai],
      [],
      ["SẢN PHẨM"],
      ["Tên sản phẩm", "Biến thể", "Số lượng", "Đơn giá", "Thành tiền"],
    ];

    const productRows = invoiceDetail.ChiTietDonHangs?.map(item => [
      item.BienTheSanPham?.SanPham?.Ten,
      item.BienTheSanPham?.Ten || "-",
      item.SoLuong,
      Number(item.BienTheSanPham?.Gia || item.DonGia),
      Number(item.BienTheSanPham?.Gia || item.DonGia) * item.SoLuong
    ]) || [];

    const ws = utils.aoa_to_sheet([...invoiceInfo, ...productRows]);
    const wb = utils.book_new();
    utils.book_append_sheet(wb, ws, "Hóa đơn");

    writeFile(wb, `HoaDon_${invoiceDetail.Ma || invoiceDetail.Id}.xlsx`);
  };

  return (
    <div className="p-6 space-y-6">
      <Meta title="Hóa đơn bán hàng" />
      <h1 className="text-3xl font-bold text-gray-800">Hóa đơn bán hàng chi nhánh</h1>

      {loading && <p className="text-gray-500">Đang tải...</p>}
      {!loading && invoices?.length === 0 && <p className="text-gray-500">Chưa có hóa đơn nào.</p>}

      {!loading && invoices?.length > 0 && (
        <div className="flex flex-col md:flex-row gap-6">
          <div className="md:w-1/3 bg-white shadow rounded-lg p-4 flex flex-col">
            <div className="flex flex-col space-y-2 mb-4">
              <input
                type="text"
                placeholder="Tìm kiếm theo mã hoặc khách hàng..."
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                className="border rounded px-3 py-2 text-sm focus:outline-none focus:ring focus:ring-blue-200"
              />
              <select
                className="border rounded px-3 py-2 text-sm focus:outline-none focus:ring focus:ring-blue-200"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                {STATUS_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>
            <div className="overflow-x-auto flex-1">
              <table className="w-full text-sm border-collapse">
                <thead className="bg-gray-50 sticky top-0 z-10">
                  <tr>
                    <th className="p-2 text-left">Mã</th>
                    <th className="p-2 text-left">Khách</th>
                    <th className="p-2 text-right">Tổng tiền</th>
                    <th className="p-2 text-left">Trạng thái</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedInvoices.map((inv) => (
                    <tr
                      key={inv.Id}
                      className={`cursor-pointer hover:bg-gray-100 transition-all ${selectedInvoiceId === inv.Id ? "bg-blue-50" : ""}`}
                      onClick={() => handleSelectInvoice(inv.Id)}
                    >
                      <td className="p-2">{inv.Ma || `#${inv.Id}`}</td>
                      <td className="p-2">{inv.KhachHang?.NguoiDung?.HoTen || "Khách vãng lai"}</td>
                      <td className="p-2 text-right">{Number(inv.TongTien).toLocaleString()}</td>
                      <td className="p-2">
                        <span className={`px-2 py-1 rounded-full text-sm ${statusColor(inv.TrangThai)}`}>
                          {inv.TrangThai}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {totalPages > 1 && (
              <div className="mt-4 flex justify-center space-x-2">
                <button
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((p) => p - 1)}
                  className="px-3 py-1 border rounded disabled:opacity-50"
                >
                  Trước
                </button>
                {Array.from({ length: totalPages }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`px-3 py-1 border rounded ${currentPage === i + 1 ? "bg-blue-500 text-white" : ""}`}
                  >
                    {i + 1}
                  </button>
                ))}
                <button
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage((p) => p + 1)}
                  className="px-3 py-1 border rounded disabled:opacity-50"
                >
                  Sau
                </button>
              </div>
            )}
          </div>
          <div className="md:w-2/3 bg-white shadow-md rounded-xl p-6 overflow-x-auto">
            {!invoiceDetail ? (
              <p className="text-gray-500">Chọn hóa đơn để xem chi tiết</p>
            ) : (
              <>
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl font-bold text-gray-700">
                    Hóa đơn: {invoiceDetail.Ma || `#${invoiceDetail.Id}`}
                  </h2>
                  <button
                    onClick={handleExportExcel}
                    className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
                  >
                    Xuất Excel
                  </button>
                </div>

                <div className="mb-6 space-y-2">
                  <p><strong>Khách hàng:</strong> {invoiceDetail.KhachHang?.NguoiDung?.HoTen || "Khách vãng lai"}</p>
                  <p><strong>Email:</strong> {invoiceDetail.KhachHang?.NguoiDung?.Email || "-"}</p>
                  <p><strong>Số điện thoại:</strong> {invoiceDetail.KhachHang?.NguoiDung?.SoDienThoai || "-"}</p>
                  <p><strong>Địa chỉ:</strong> {`${invoiceDetail.TinhThanh}, ${invoiceDetail.QuanHuyen}, ${invoiceDetail.XaPhuong}, ${invoiceDetail.DiaChiChiTiet}`}</p>
                  <p><strong>Ngày đặt:</strong> {new Date(invoiceDetail.NgayDat).toLocaleDateString()}</p>
                  <p><strong>Tổng tiền:</strong> {Number(invoiceDetail.TongTien).toLocaleString()} VND</p>
                  <p><strong>Phương thức thanh toán:</strong> {invoiceDetail.PhuongThucThanhToan || "-"}</p>
                  <p><strong>Trạng thái:</strong>
                    <span className={`ml-2 px-2 py-1 rounded-full text-sm ${statusColor(invoiceDetail.TrangThai)}`}>
                      {invoiceDetail.TrangThai}
                    </span>
                  </p>
                </div>

                <h3 className="text-xl font-semibold text-gray-700 mb-2">Sản phẩm</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border rounded-lg">
                    <thead className="bg-gray-50 border-b">
                      <tr>
                        <th className="p-2 text-left">Sản phẩm</th>
                        <th className="p-2 text-left">Biến thể</th>
                        <th className="p-2 text-right">Số lượng</th>
                        <th className="p-2 text-right">Đơn giá</th>
                        <th className="p-2 text-right">Thành tiền</th>
                      </tr>
                    </thead>
                    <tbody>
                      {invoiceDetail.ChiTietDonHangs?.map((item) => (
                        <tr key={item.Id} className="border-b hover:bg-gray-50">
                          <td className="p-2">{item.BienTheSanPham?.SanPham?.Ten}</td>
                          <td className="p-2">{item.BienTheSanPham?.Ten || "-"}</td>
                          <td className="p-2 text-right">{item.SoLuong}</td>
                          <td className="p-2 text-right">{Number(item.BienTheSanPham?.Gia || item.DonGia).toLocaleString()}</td>
                          <td className="p-2 text-right">{(Number(item.BienTheSanPham?.Gia || item.DonGia) * item.SoLuong).toLocaleString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
