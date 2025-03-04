const asyncHandler = require("express-async-handler");
const { registerUser, loginUser } = require("../services/authService");

/**
 * @desc Register a new user
 * @route POST/api/auth/register
 * @access Public
 */

const register = asyncHandler(async(req, res) => {
    const { name, email, password } = req.body;
    const userData = await registerUser(name, email, password);
    res.status(201).json(userData);
});

/** 
 * @desc Login User
 * @route POST/api/auth/login
 * @access Public
*/

const login = asyncHandler(async(req, res) => {
    const { email, password } = req.body;
    const { token, user } = await loginUser(email, password);

    //Set token as HttpOnly cookie
    res.cookie("jwt", token, {
        httpOnly: true, //Prevents Javascript access (XSS protection)
        secure: process.env.NODE_ENV === "production", //Works only in HTTPS in production
        sameSite: "Strict", //Prevents CSRF attacks
        maxAge: 30 * 24 * 60 * 60 * 1000, //30 days
    });
    res.json({ message: "Login successful", user });
});

/** 
 * @desc Logout User
 * @route POST/api/auth/logout
 * @access Private
*/

const logout = asyncHandler(async(req, res) => {
    res.cookie("jwt", "", {
        httpOnly: true,
        expires: new Date(0), //Expire Immediately
    });

    res.json({ message: "Logged out successfully" });
})

module.exports = { register, login, logout };