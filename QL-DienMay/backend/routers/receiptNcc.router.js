const express = require("express");
const router = express.Router();
const controller = require("../controllers/receiptNcc.controller");
const auth = require("../middleware/auth");
router.get("/", controller.getAll);
router.get("/:id", controller.getById);

router.post("/",auth, controller.create);
router.put("/:id/confirm",auth, controller.confirm);
router.put("/:id/cancel",auth, controller.cancel);

module.exports = router;
