const productVariantService = require("../services/productVariant.service");

exports.getAll = async (req, res) => {
  try {
    const variants = await productVariantService.getAll();
    res.json(variants);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const variant = await productVariantService.getById(req.params.id);
    res.json(variant);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
