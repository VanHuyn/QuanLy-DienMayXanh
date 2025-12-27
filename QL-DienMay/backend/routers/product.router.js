const express = require("express");
const router = express.Router();
const ProductsController = require("../controllers/product.controller");
const upload = require("../middleware/uploadCloudinary");
router.post("/", upload.array("images", 10), ProductsController.create);
router.put("/:id", upload.array("images", 10), ProductsController.update);
// GET
router.get("/", ProductsController.getAll);
router.get("/:id", ProductsController.getById);
router.get("/by-category/:categoryId", ProductsController.getByCategory);
router.get("/by-category-slug/:slug", ProductsController.getByCategorySlug);

// DELETE
router.delete("/:id", ProductsController.delete);

module.exports = router;
