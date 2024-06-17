const express = require("express");
const router = express.Router();
const { login, getUserDetails, getAllUsers } = require("../controller/user_controller");
const { verifyToken, isAdmin } = require("../middleware/auth");

// Route for login
router.post("/", login);

// Route to get user details
router.post("/user-details", verifyToken, getUserDetails);

// Route to get all users - protected and only accessible by admin
router.get("/all-users", verifyToken, isAdmin, getAllUsers);

module.exports = router;
