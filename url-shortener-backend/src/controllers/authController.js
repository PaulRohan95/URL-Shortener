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
    const userData = await loginUser(email, password);
    res.json(userData);
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