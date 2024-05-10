const express = require("express");
const router = express.Router();
const { popular } = require("../controller/popular_controller.js");
router.get("/popular", popular);
module.exports = router;
