const express = require("express");
const { protect } = require("../middlewares/authMiddleware");
const {  shortenUrl, getUrls, deleteUrl, redirectUrl } = require("../controllers/urlController");

const router = express.Router();

router.post("/shorten", protect, shortenUrl);
router.get("/my-urls", protect, getUrls);
router.delete("/:id", protect, deleteUrl);
router.get("/:shortUrl", redirectUrl);

module.exports = router;