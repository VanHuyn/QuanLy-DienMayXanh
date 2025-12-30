const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const auth = require("../middleware/auth");
// CREATE
router.post("/", userController.create);

// GET ALL USERS
router.get("/", userController.getAll);

// GET USER BY ID
router.put("/me", auth, userController.updateMe);
router.get("/:id", userController.getById);
router.get("/branch/:chiNhanhId", userController.getByBranch);

// UPDATE USER
router.put("/:id", userController.update);

// DELETE USER
router.delete("/:id", userController.delete);

module.exports = router;
