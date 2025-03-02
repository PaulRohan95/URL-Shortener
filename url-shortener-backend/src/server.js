const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("../src/config/db");

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const urlRoutes = require("./routes/urlRoutes");


dotenv.config();
connectDB(); //Connecting to MongoDB

const app = express();
app.use(express.json());

//Routes
app.use("/api/auth", authRoutes);

app.use((req, res, next) => {
    console.log(`Incoming Request: ${req.method} ${req.url}`);
    next();
});

app.use("/api/users", userRoutes);
app.use("/api/url", urlRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});