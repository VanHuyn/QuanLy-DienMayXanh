import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSupplierImportDetails } from "../../context/SupplierImportDetailContext";
import { useProductVariants } from "../../context/ProductVariantContext";

export default function SupplierImportDetailPage() {
  const { id } = useParams();
  const { details, phieu, fetchDetails, removeDetail } =
    useSupplierImportDetails();
  const { variants } = useProductVariants();

  useEffect(() => {
    fetchDetails(id);
  }, [id]);

  const isEditable = phieu?.TrangThai === "ChoNhap";

  const tongTien = details.reduce(
    (sum, d) => sum + d.SoLuong * Number(d.DonGia),
    0
  );

  return (
    <div className="p-6">
      {/* HEADER */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold">
          Chi tiết phiếu nhập #{id}
        </h2>
        <p className="text-sm text-gray-500">
          Trạng thái:{" "}
          <span className="font-medium text-blue-600">
            {phieu?.TrangThai}
          </span>
        </p>
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto rounded-lg shadow">
        <table className="w-full bg-white">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="p-3">Sản phẩm</th>
              <th className="p-3 text-right">SL</th>
              <th className="p-3 text-right">Giá</th>
              <th className="p-3 text-right">Thành tiền</th>
              {isEditable && <th className="p-3 text-center">Hành động</th>}
            </tr>
          </thead>

          <tbody>
            {details.map((d) => {
              const variant = variants.find(
                (v) => v.Id === d.BienTheSanPhamId
              );

              return (
                <tr
                  key={d.Id}
                  className="border-t hover:bg-gray-50"
                >
                  <td className="p-3">
                    <div className="font-medium">
                      {variant?.SanPham?.Ten || "—"}
                    </div>
                    <div className="text-sm text-gray-500">
                      {/* {variant?.Ten} */}
                    </div>
                  </td>

                  <td className="p-3 text-right">
                    {d.SoLuong}
                  </td>

                  <td className="p-3 text-right">
                    {Number(d.DonGia).toLocaleString()} ₫
                  </td>

                  <td className="p-3 text-right font-medium">
                    {(d.SoLuong * Number(d.DonGia)).toLocaleString()} ₫
                  </td>

                  {isEditable && (
                    <td className="p-3 text-center">
                      <button
                        onClick={() => removeDetail(d.Id, id)}
                        className="text-red-600 hover:underline"
                      >
                        Xoá
                      </button>
                    </td>
                  )}
                </tr>
              );
            })}

            {details.length === 0 && (
              <tr>
                <td
                  colSpan={isEditable ? 5 : 4}
                  className="p-6 text-center text-gray-500"
                >
                  Chưa có sản phẩm nào
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* TOTAL */}
      <div className="flex justify-end mt-6">
        <div className="bg-gray-100 px-6 py-3 rounded-lg text-lg font-bold">
          Tổng tiền: {tongTien.toLocaleString()} ₫
        </div>
      </div>
    </div>
  );
}
