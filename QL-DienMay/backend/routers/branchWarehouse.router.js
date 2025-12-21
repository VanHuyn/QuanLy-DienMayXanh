const express = require("express");
const router = express.Router();
const BranchWarehouseController = require("../controllers/branchWarehouse.controller");

// GET all
router.get("/", BranchWarehouseController.getAll);

// GET by id
router.get("/:id", BranchWarehouseController.getById);

// CREATE
router.post("/", BranchWarehouseController.create);

// UPDATE
router.put("/:id", BranchWarehouseController.update);

// DELETE
router.delete("/:id", BranchWarehouseController.delete);

module.exports = router;
