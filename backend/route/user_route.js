const express = require("express");
const router = express.Router();
const { getUserDetails } = require("../controller/login_controller");

router.get("/", getUserDetails);
module.exports = router;
