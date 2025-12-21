const service = require("../services/supplierImportDetail.service");

exports.getByPhieu = async (req, res) => {
  try {
    const data = await service.getByPhieu(req.params.phieuNhapId);
    res.json(data); 
  } catch (e) {
    res.status(404).json({ message: e.message });
  }
};

exports.create = async (req, res) => {
  const data = await service.create(req.params.phieuNhapId, req.body);
  res.json({ message: "Đã thêm sản phẩm", data });
};

exports.remove = async (req, res) => {
  await service.remove(req.params.id);
  res.json({ message: "Đã xoá sản phẩm" });
};
