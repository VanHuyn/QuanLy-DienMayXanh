import { useState, useEffect } from "react";
import { useChat } from "../../context/ChatContext";
import toast from "react-hot-toast";

export default function ChatSupportPage() {
  const {
    cuocTroChuyens,
    selectedCuoc,
    selectCuoc,
    tinNhans,
    sendTinNhan,
    messagesEndRef,
    timKhachHang,
    taoHoacLayCuocTroChuyen,
  } = useChat();

  const [tinNhanMoi, setTinNhanMoi] = useState("");
  const [soDienThoai, setSoDienThoai] = useState("");
  const [searching, setSearching] = useState(false);
  const [searchResult, setSearchResult] = useState(null);
  const [searchError, setSearchError] = useState("");
  const [sending, setSending] = useState(false);

  const handleSend = async () => {
    if (!tinNhanMoi.trim() || sending) return;
    setSending(true);

    const messageToSend = tinNhanMoi.trim();
    setTinNhanMoi("");

    try {
      await sendTinNhan(messageToSend);
    } catch (err) {
      console.error(err);
      toast.error("Gửi tin nhắn thất bại");
    } finally {
      setSending(false);
    }
  };

  const handleSearch = async () => {
    if (!soDienThoai.trim()) return;
    setSearching(true);
    setSearchError("");
    setSearchResult(null);
    try {
      const khachHang = await timKhachHang(soDienThoai.trim());
      if (khachHang) setSearchResult(khachHang);
      else setSearchError("Không tìm thấy khách hàng");
    } catch (err) {
      console.error(err);
      setSearchError("Lỗi tìm kiếm");
    } finally {
      setSearching(false);
    }
  };

  const handleSelectSearchResult = async () => {
    if (!searchResult) return;
    const cuoc = await taoHoacLayCuocTroChuyen({
      KhachHangId: searchResult.Id,
    });
    selectCuoc(cuoc);
    setSearchResult(null);
    setSoDienThoai("");
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    const lastTin = tinNhans[tinNhans.length - 1];
    if (lastTin && lastTin.NguoiGui === "KhachHang") {
      toast(`Tin nhắn mới từ ${selectedCuoc?.KhachHang?.NguoiDung?.HoTen}`, {
        icon: "💬",
      });
    }
  }, [tinNhans]);

  const countUnread = (cuoc) =>
    cuoc.TinNhans?.filter((t) => t && !t.DaXem && t.NguoiGui === "KhachHang")
      .length || 0;

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-96 bg-white border-r flex flex-col shadow-lg">
        <div className="p-4 border-b bg-blue-600 text-white">
          <h2 className="text-xl font-bold">Hỗ trợ khách hàng</h2>
          <p className="text-sm text-white/80 mt-1">
            Danh sách khách hàng đang chat
          </p>
        </div>

        {/* Search */}
        <div className="p-3 border-b">
          <div className="flex gap-2">
            <input
              type="text"
              value={soDienThoai}
              onChange={(e) => setSoDienThoai(e.target.value)}
              placeholder="Nhập số điện thoại..."
              className="flex-1 border rounded-full px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            />
            <button
              onClick={handleSearch}
              disabled={searching}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full disabled:opacity-50"
            >
              {searching ? "Đang tìm..." : "Tìm"}
            </button>
          </div>

          {searchResult && (
            <div
              onClick={handleSelectSearchResult}
              className="mt-2 p-2 border rounded-lg cursor-pointer hover:bg-gray-50 bg-gray-50 shadow-sm"
            >
              <p className="font-semibold">{searchResult?.NguoiDung?.HoTen}</p>
              <p className="text-sm text-gray-500">
                {searchResult?.NguoiDung?.SoDienThoai}
              </p>
            </div>
          )}
          {searchError && (
            <p className="text-red-500 text-sm mt-2">{searchError}</p>
          )}
        </div>

        {/* List conversations */}
        <div className="flex-1 overflow-y-auto">
          {cuocTroChuyens.map((cuoc) => (
            <div
              key={cuoc.Id}
              onClick={() => selectCuoc(cuoc)}
              className={`flex flex-col p-3 cursor-pointer hover:bg-gray-50 relative ${
                selectedCuoc?.Id === cuoc.Id ? "bg-blue-50" : ""
              }`}
            >
              <div className="flex justify-between items-center">
                <p className="font-semibold">
                  {cuoc.KhachHang?.NguoiDung?.HoTen || "Khách vãng lai"}
                </p>
                {countUnread(cuoc) > 0 && (
                  <span className="absolute top-3 right-3 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                    {countUnread(cuoc)}
                  </span>
                )}
              </div>
              <p className="text-sm text-gray-500 mt-1 line-clamp-1">
                {cuoc.TinNhans?.filter(Boolean)?.slice(-1)[0]?.NoiDung ||
                  "Chưa có tin nhắn"}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Chat box */}
      <div className="flex-1 flex flex-col">
        {selectedCuoc ? (
          <>
            <div className="p-4 border-b bg-white flex items-center gap-3 shadow-md">
              <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
                {selectedCuoc.KhachHang?.NguoiDung?.HoTen?.charAt(0) || "K"}
              </div>
              <div>
                <p className="font-semibold">
                  {selectedCuoc.KhachHang?.NguoiDung?.HoTen || "Khách vãng lai"}
                </p>
                <p className="text-sm text-gray-500">
                  {selectedCuoc.KhachHang?.NguoiDung?.SoDienThoai || ""}
                </p>
              </div>
            </div>

            <div className="flex-1 p-4 overflow-y-auto flex flex-col gap-3 bg-gray-50">
              {tinNhans
                .filter((tn) => tn && tn.NoiDung)
                .map((tn) => {
                  const nguoiGui = tn.NguoiGui || "KhachHang";
                  const isNhanVien = nguoiGui === "NhanVienBanHang";
                  return (
                    <div
                      key={tn.Id || Math.random()}
                      className={`flex ${
                        isNhanVien ? "justify-end" : "justify-start"
                      }`}
                    >
                      <div
                        className={`p-3 rounded-xl max-w-[70%] break-word shadow-sm ${
                          isNhanVien
                            ? "bg-blue-500 text-white rounded-br-none"
                            : "bg-gray-200 text-gray-800 rounded-bl-none"
                        }`}
                      >
                        <p className="text-sm">{tn.NoiDung}</p>
                        <p
                          className={`text-xs mt-1 ${
                            isNhanVien ? "text-white/70" : "text-gray-500"
                          }`}
                        >
                          {tn.createdAt
                            ? new Date(tn.createdAt).toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                              })
                            : ""}
                        </p>
                      </div>
                    </div>
                  );
                })}
              <div ref={messagesEndRef} />
            </div>

            <div className="p-4 border-t bg-white flex gap-2 items-center shadow-inner">
              <input
                type="text"
                value={tinNhanMoi}
                onChange={(e) => setTinNhanMoi(e.target.value)}
                placeholder="Nhập tin nhắn..."
                className="flex-1 border rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
              />
              <button
                onClick={handleSend}
                disabled={sending}
                className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-full shadow-md transition hover:scale-105 disabled:opacity-50"
              >
                Gửi
              </button>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-400">
            Chọn khách hàng để bắt đầu trò chuyện
          </div>
        )}
      </div>
    </div>
  );
}
