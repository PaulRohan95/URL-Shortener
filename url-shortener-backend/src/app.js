const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const errorMiddleware = require("./middlewares/errorMiddleware");

const app = express();


//Middlewares

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));

//Routes

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/url", require("./routes/urlRoutes"));

app.use((req, res, next) => {
    res.status(404).json({ message: "Route not found" });
});


//Error handling middleware

app.use(errorMiddleware);

module.exports = app;