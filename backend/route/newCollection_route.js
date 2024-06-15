const express = require("express");
const router = express.Router();
const { newCollection } = require("../controller/newCollection_controller.js");

router.get("/", newCollection);
module.exports = router;
