import { useState, useEffect, useRef } from "react";
import { useChat } from "../../context/ChatContext";

export default function ChatWidget() {
  const { selectedCuoc, tinNhans, sendTinNhan, fetchCuocTroChuyenKhach } =
    useChat();
  const [open, setOpen] = useState(false);
  const [tinNhanMoi, setTinNhanMoi] = useState("");
  const messagesEndRef = useRef(null);

  // Load cuộc trò chuyện khách khi mở popup lần đầu
  useEffect(() => {
    if (open) {
      fetchCuocTroChuyenKhach();
    }
  }, [open, fetchCuocTroChuyenKhach]);

  // Scroll xuống cuối khi có tin nhắn mới
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [tinNhans]);

  const handleSend = () => {
    if (!tinNhanMoi.trim()) return;
    sendTinNhan(tinNhanMoi);
    setTinNhanMoi("");
  };

  return (
    <>
      {/* Nút chat nổi */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-5 right-5 w-16 h-16 rounded-full bg-blue-500 text-white shadow-xl flex items-center justify-center hover:bg-blue-600 z-50 text-2xl transition-transform hover:scale-110"
      >
        💬
      </button>

      {/* Popup chat */}
      {open && (
        <div className="fixed bottom-24 right-5 w-80 h-96 bg-white shadow-2xl rounded-xl flex flex-col overflow-hidden z-50">
          {/* Header */}
          <div className="bg-blue-500 text-white p-3 flex items-center justify-between rounded-t-xl shadow-md">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-blue-500 font-bold">
                H
              </div>
              <span className="font-semibold text-lg">Hỗ trợ trực tuyến</span>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="font-bold text-lg hover:text-gray-200 transition"
            >
              ✖
            </button>
          </div>

          {/* Tin nhắn */}
          <div className="flex-1 p-3 overflow-y-auto bg-gray-50 flex flex-col gap-2">
            {selectedCuoc ? (
              tinNhans.length > 0 ? (
                tinNhans
                  .filter(Boolean) // loại bỏ undefined/null
                  .map((tn) => {
                    const isKhachGui = tn?.NguoiGui === "KhachHang";
                    return (
                      <div
                        key={tn?.Id || Math.random()} // fallback key nếu tn.Id undefined
                        className={`flex ${
                          isKhachGui ? "justify-end" : "justify-start"
                        }`}
                      >
                        <div
                          className={`p-2 rounded-xl max-w-[70%] break-word shadow-sm ${
                            isKhachGui
                              ? "bg-blue-500 text-white rounded-br-none"
                              : "bg-gray-200 text-gray-800 rounded-bl-none"
                          }`}
                        >
                          <p className="text-sm">{tn?.NoiDung || ""}</p>
                          <p className="text-xs text-gray-100 mt-1 text-right">
                            {tn?.createdAt
                              ? new Date(tn.createdAt).toLocaleTimeString([], {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                })
                              : ""}
                          </p>
                        </div>
                      </div>
                    );
                  })
              ) : (
                <p className="text-gray-400 text-center mt-10">
                  Chưa có tin nhắn nào
                </p>
              )
            ) : (
              <p className="text-gray-400 text-center mt-10">
                Chọn cuộc trò chuyện để bắt đầu
              </p>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input gửi tin nhắn */}
          <div className="p-3 border-t bg-white flex gap-2 items-center shadow-inner">
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
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full shadow-md transition transform hover:scale-105"
            >
              Gửi
            </button>
          </div>
        </div>
      )}
    </>
  );
}
