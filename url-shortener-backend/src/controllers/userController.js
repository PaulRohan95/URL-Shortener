const User = require("../models/User");

/**
 * @desc Get logged-in user profile
 * @route GET /api/users/profile
 * @access Private (Requires JWT)
 */
const getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password"); // Exclude password
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
};

module.exports = { getUserProfile };
