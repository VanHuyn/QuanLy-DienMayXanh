import { useState } from "react";
import { useBranches } from "../../context/BranchContext";

export default function BranchSelectModal() {
  const { branches, selectedBranch, selectBranch, loading } = useBranches();
  const [branchId, setBranchId] = useState("");
  if (selectedBranch) return null;

  const handleConfirm = () => {
    const branch = branches.find(b => b.Id === Number(branchId));
    if (!branch) return;
    selectBranch(branch);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white w-[420px] rounded-xl shadow-xl p-6 animate-fadeIn">
        <h2 className="text-xl font-semibold text-center mb-2">
          📍 Chọn chi nhánh gần bạn
        </h2>
        <p className="text-sm text-gray-500 text-center mb-4">
          Giá và tồn kho sẽ hiển thị theo chi nhánh bạn chọn
        </p>

        {loading ? (
          <p className="text-center text-gray-500">
            Đang tải danh sách chi nhánh...
          </p>
        ) : (
          <>
            <label className="block text-sm font-medium mb-1">
              Chi nhánh
            </label>
            <select
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={branchId}
              onChange={(e) => setBranchId(e.target.value)}
            >
              <option value="">-- Chọn chi nhánh --</option>
              {branches.map(branch => (
                <option key={branch.Id} value={branch.Id}>
                  {branch.Ten} – {branch.Diachi}
                </option>
              ))}
            </select>

            <button
              onClick={handleConfirm}
              disabled={!branchId}
              className={`mt-5 w-full py-2 rounded-lg font-medium transition
                ${
                  branchId
                    ? "bg-blue-600 text-white hover:bg-blue-700"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }
              `}
            >
              Xác nhận chi nhánh
            </button>
          </>
        )}
      </div>
    </div>
  );
}
