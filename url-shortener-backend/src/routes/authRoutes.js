const express = require("express");
const { register, login } = require("../controllers/authController");

const router = express.Router();


router.post("/register", register);
router.post("/login", (req, res, next) => {

    console.log("Request received at /login");
    console.log("Body:", req.body);
    next();
}, login);

module.exports = router;