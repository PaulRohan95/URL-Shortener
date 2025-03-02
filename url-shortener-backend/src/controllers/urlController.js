const Url = require("../models/Url");
const shortid = require("shortid");
const asyncHandler = require("express-async-handler");

/**
 * @desc Shorten a URL
 * @route POST /api/url/shorten
 * @access Private (Requires JWT)
 */

const shortenUrl = asyncHandler(async(req, res) => {
    console.log("Incoming request body:", req.body); // Debugging
    const { originalUrl } = req.body;

    if (!originalUrl) {
        res.status(400);
        throw new Error("Original URL is required");
    }

    const shortUrl = shortid.generate(); //Generate a short unique ID

    const newUrl = await Url.create({ 
        originalUrl,
        shortUrl,
        user: req.user.id,
    });

    res.status(201).json(newUrl);
});

//@desc Get all shortened URLs for logged in user
//@route GET/api/url/my-urls
//@access Private

const getUrls = asyncHandler(async(req, res) => {
    const urls = await Url.find({ user:req.user.id });
    res.json(urls);
});

module.exports = { shortenUrl, getUrls };