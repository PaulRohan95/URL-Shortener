const mongoose = require("mongoose");

const UrlSchema = new mongoose.Schema(
    {
        originalUrl: {
            type: String,
            required: true,
        },
        shortUrl: {
            type: String,
            required: true,
            unique: true,
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        clicks: {
            type: Number,
            default: 0 //Default set to 0 visits initially
        },
        visits: [
            {
                timestamp: {
                    type: Date,
                    default: Date.now //Storing timestamp of each visit
                },
                userAgent: String, //Storing User-Agent
                referrer: String //Storing referrer
            }
        ]
    },
    { timestamps: true }
);

const Url = mongoose.model("Url", UrlSchema);
module.exports = Url;