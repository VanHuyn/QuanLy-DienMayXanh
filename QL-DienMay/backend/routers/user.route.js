const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");

// CREATE
router.post("/", userController.create);

// GET ALL USERS
router.get("/", userController.getAll);

// GET USER BY ID
router.get("/:id", userController.getById);

// UPDATE USER
router.put("/:id", userController.update);

// DELETE USER
router.delete("/:id", userController.delete);

module.exports = router;
