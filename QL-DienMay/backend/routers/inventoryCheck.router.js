const express = require("express");
const router = express.Router();
const controller = require("../controllers/inventoryCheck.controller");
const auth = require("../middleware/auth");

router.post("/", auth, controller.adjust);

module.exports = router;
