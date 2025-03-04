const User = require("../models/User");
const jwt = require("jsonwebtoken");

//Generate JWT Tokens

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

//User signup
const registerUser = async (name, email, password) => {
    const userExists = await User.findOne({ email });
    if (userExists) {
        throw new Error("User already exists");
    }

    const user = await User.create({ name, email, password });
    if (!user) {
        throw new Error("Invalid user data");
    }

    return {
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
    };
};

//User login
const loginUser = async(email, password) => {
    const user = await User.findOne({ email });
    if(!user || !(await user.matchPassword(password))) {
        throw new Error("Invalid email or password");
    }

    //Generate token
    const token = generateToken(user._id);

    return {
        token,
        user: {
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id),  
        },
    };
};

module.exports = { registerUser, loginUser };