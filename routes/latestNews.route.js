const express = require("express");
const router = express.Router();
const auth = require("../middleware/authEditor");
const {
    addLatestNews, updateLatestNews, deleteLatestNews ,getLatestNews
} = require("../controllers/latestNews.controller");

//@route  POST api/authPresenter
//@desc   Register presenter
//@access Public
router.get("/", getLatestNews);
router.post("/", auth, addLatestNews);
router.put("/", auth, updateLatestNews);
router.delete("/",auth, deleteLatestNews);

module.exports = router;
