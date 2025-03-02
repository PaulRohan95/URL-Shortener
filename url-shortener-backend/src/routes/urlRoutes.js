const express = require("express");
const { protect } = require("../middlewares/authMiddleware");
const {  shortenUrl, getUrls } = require("../controllers/urlController");

const router = express.Router();

router.post("/shorten", protect, shortenUrl);
router.get("/my-urls", protect, getUrls);

module.exports = router;