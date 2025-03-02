const Url = require("../models/Url");
const shortid = require("shortid");
const asyncHandler = require("express-async-handler");

/**
 * @desc Shorten a URL with optional custom alias
 * @route POST /api/url/shorten
 * @access Private (Requires JWT)
 */

const shortenUrl = asyncHandler(async(req, res) => {
    const { originalUrl, customShortUrl } = req.body;

    if (!originalUrl) {
        res.status(400);
        throw new Error("Original URL is required");
    }

    let shortUrl;

    if (customShortUrl) {
        //Ensuring the custom short URL follows a valid format (optional validation)
        const validCustomUrlRegex = /^[a-zA-Z0-9_-]+$/;
        if (!validCustomUrlRegex.test(customShortUrl)) {
            res.status(400);
            throw new Error("Custom short URL can only contain letters, numbers, hyphens, and underscores.");
        }

        //Checking if customShortUrl is already taken
        const existingUrl = await Url.findOne({ shortUrl: customShortUrl });
        if(existingUrl) {
            res.status(400);
            throw new Error("Custom short url is already taken. Please choose another one.");
        }
        shortUrl = customShortUrl;
    } else {
        //Generating a random short URL if no custom URL is provided
        shortUrl = shortid.generate();
    }

    const newUrl = await Url.create({ 
        originalUrl,
        shortUrl,
        user: req.user.id,
    });

    res.status(201).json(newUrl);
});
/**
 * @desc Get all shortened URLs for logged in user
 * @route GET/api/url/my-urls
 * @access Private
 */

const getUrls = asyncHandler(async(req, res) => {
    const urls = await Url.find({ user:req.user.id });
    res.json(urls);
});

/**
 * @desc Redirect to original URL and track visits
 * @route GET /:shortUrl
 * @access Public
 */

const redirectUrl = asyncHandler(async(req, res) => {
    const { shortUrl } = req.params;

    const url = await Url.findOne({ shortUrl });

    if(!url) {
        res.status(404);
        throw new Error("Short URL not found");
    }

    //Track visits

    url.clicks += 1;
    url.visits.push({
        timestamp: new Date(),
        userAgent: req.headers["user-agent"], //Store User-Agent
        referrer: req.headers.referrer || "Direct Visit" //Store referrer (if available)
    });
    await url.save();

    //Redirect to original URL
    res.redirect(url.originalUrl);
})


/**
 * @desc Delete a shortened URL
 * @route DELETE /api/url/:id
 * @access Private (requires JWT)
 */

const deleteUrl = asyncHandler(async(req, res) => {
    const url = await Url.findById(req.params.id);

    if(!url) {
        res.status(404);
        throw new Error("URL not found");
    }

    //Ensuring the logged in user owns this URL
    if(url.user.toString() !== req.user.id) {
        res.status(401);
        throw new Error("Not authorized to delete this URL");
    }

    await url.deleteOne();

    res.json({ message: "URL deleted successfully" });
});

module.exports = { shortenUrl, getUrls, deleteUrl, redirectUrl };