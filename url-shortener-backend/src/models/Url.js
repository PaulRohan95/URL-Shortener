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
                userAgent: { type: String }, //Storing User-Agent
                referrer: { type: String } //Storing referrer
            }
        ],
        expiresAt: { type: Date, default: null },
        qrCode: { type: String } //Store QR Code as base64
    },
    // { timestamps: true }
);

//Automatically delete expired URLs
// UrlSchema.index({ expiresAt: 1 }, { expiresAfterSeconds: 0 });

const Url = mongoose.model("Url", UrlSchema);
module.exports = Url;