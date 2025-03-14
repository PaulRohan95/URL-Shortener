const express = require("express");
const { getUserProfile } = require("../controllers/userController");
const { protect } = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/profile", protect, getUserProfile); //Protected route for user profile

module.exports = router;