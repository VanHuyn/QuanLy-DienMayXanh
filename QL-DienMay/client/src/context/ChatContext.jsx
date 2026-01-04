import {
  createContext,
  useContext,
  useEffect,
  useState,
  useRef,
  useCallback,
} from "react";
import { io } from "socket.io-client";
import chatService from "../services/chatService";
import useAuth from "../hooks/useAuth";

const ChatContext = createContext();
export const useChat = () => useContext(ChatContext);

export const ChatProvider = ({ children }) => {
  const { user } = useAuth();
  const [cuocTroChuyens, setCuocTroChuyens] = useState([]);
  const [selectedCuoc, setSelectedCuoc] = useState(null);
  const [tinNhans, setTinNhans] = useState([]);
  const [loading, setLoading] = useState(false);

  const socket = useRef(null);
  const selectedCuocRef = useRef(selectedCuoc);
  const messagesEndRef = useRef(null);

  const userRole = user?.VaiTro?.Ten;

  // Ref để track selectedCuoc cho socket
  useEffect(() => {
    selectedCuocRef.current = selectedCuoc;
  }, [selectedCuoc]);

  // Reset chat và kết nối socket khi user thay đổi (login/logout)
  useEffect(() => {
    // Reset state
    setCuocTroChuyens([]);
    setSelectedCuoc(null);
    setTinNhans([]);

    // Disconnect socket cũ nếu có
    if (socket.current) {
      socket.current.disconnect();
      socket.current = null;
    }

    if (!user) return; // logout -> stop

    // Kết nối socket mới
    socket.current = io("http://localhost:5000");

    socket.current.on("connect", () => {
      console.log("Socket connected:", socket.current.id);
    });

    socket.current.on("receiveMessage", (tin) => {
      // chỉ hiển thị tin nhắn nếu đang chọn cuộc trò chuyện đó
      if (selectedCuocRef.current?.Id === tin.CuocTroChuyenId) {
        setTinNhans((prev) => [...prev, tin]);
      }

      // Cập nhật danh sách cuộc trò chuyện nếu là nhân viên
      if (userRole === "NhanVienBanHang") {
        fetchCuocTroChuyensNhanVien();
      }
    });

    // Fetch dữ liệu theo role
    if (userRole === "KhachHang") {
      fetchCuocTroChuyenKhach(user.Id); // chỉ lấy nếu có, không tạo mới
    } else if (userRole === "NhanVienBanHang") {
      fetchCuocTroChuyensNhanVien();
    }
  }, [user]);

  // Join room
  const joinRoom = (cuocTroChuyenId) => {
    if (socket.current && cuocTroChuyenId) {
      socket.current.emit("joinRoom", cuocTroChuyenId);
    }
  };

  // ------------------- NHÂN VIÊN -------------------
  const fetchCuocTroChuyensNhanVien = async () => {
    try {
      setLoading(true);
      const data = await chatService.getCuocTroChuyens(); // tất cả các cuộc trò chuyện
      setCuocTroChuyens(data || []);
      // nếu chưa chọn cuộc trò chuyện nào, chọn cuộc đầu tiên
      if (data?.length > 0 && !selectedCuocRef.current) {
        selectCuoc(data[0]);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // ------------------- KHÁCH HÀNG -------------------
  const fetchCuocTroChuyenKhach = useCallback(async (userId) => {
    if (!userId) return;
    try {
      setLoading(true);
      const data = await chatService.getCuocTroChuyenKhach(userId, {
        createIfNotExist: false, // KHÔNG tạo mới tự động
      });
      if (data) {
        setSelectedCuoc(data);
        setTinNhans(data?.TinNhans || []);
        joinRoom(data.Id);
      } else {
        setSelectedCuoc(null);
        setTinNhans([]);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Lấy tin nhắn theo cuộc trò chuyện
  const fetchTinNhans = async (cuocId) => {
    if (!cuocId) return;
    try {
      const data = await chatService.getTinNhans(cuocId);
      setTinNhans(data || []);
      joinRoom(cuocId);
    } catch (err) {
      console.error(err);
    }
  };

  // Chọn cuộc trò chuyện
  const selectCuoc = async (cuoc) => {
    setSelectedCuoc(cuoc);
    await fetchTinNhans(cuoc.Id);
    joinRoom(cuoc.Id);
  };

const sendTinNhan = async (NoiDung) => {
  if (!NoiDung.trim() || !user) return;

  if (!selectedCuocRef.current) return;

  joinRoom(selectedCuocRef.current.Id);

  socket.current.emit("sendMessage", {
    CuocTroChuyenId: selectedCuocRef.current.Id,
    NoiDung,
    NguoiGui: user.VaiTro.Ten,
  });
};

  // Tìm khách hàng theo SDT
  const timKhachHang = async (soDienThoai) => {
    try {
      const khachHang = await chatService.timKhachHangTheoSDT(soDienThoai);
      return khachHang || null;
    } catch (err) {
      console.error(err);
      return null;
    }
  };

  // Tạo hoặc lấy cuộc trò chuyện
  const taoHoacLayCuocTroChuyen = async ({ KhachHangId, NhanVienId }) => {
    try {
      const cuoc = await chatService.getOrCreateCuocTroChuyen({
        KhachHangId,
        NhanVienId,
      });
      // Cập nhật danh sách nhân viên
      if (userRole === "NhanVienBanHang") await fetchCuocTroChuyensNhanVien();
      if (cuoc?.Id) selectCuoc(cuoc);
      return cuoc;
    } catch (err) {
      console.error(err);
      return null;
    }
  };

  // Scroll xuống cuối khi có tin nhắn mới
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [tinNhans]);

  return (
    <ChatContext.Provider
      value={{
        cuocTroChuyens,
        selectedCuoc,
        selectCuoc,
        tinNhans,
        sendTinNhan,
        timKhachHang,
        taoHoacLayCuocTroChuyen,
        fetchCuocTroChuyenKhach,
        fetchCuocTroChuyensNhanVien,
        loading,
        messagesEndRef,
        joinRoom,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
