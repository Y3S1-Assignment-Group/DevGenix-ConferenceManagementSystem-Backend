const express = require("express");
const router = express.Router();
const auth = require("../middleware/authEditor");
const {
  addLatestNews,
  updateLatestNews,
  deleteLatestNews,
  getLatestNews,
  getApprovedLatestNews,
  getUnapprovedLatestNews,
  approveLastestNews,
} = require("../controllers/latestNews.controller");

//@route  GET api/LatestNews
//@desc   get Latest news
//@access Public
router.get("/", getLatestNews);

//@route  POST api/LatestNews
//@desc   add Latest news
//@access Public
router.post("/", auth, addLatestNews);
//@route  PUT api/LatestNews
//@desc   update Latest news
//@access Public
router.put("/", auth, updateLatestNews);
//@route  DELETE api/LatestNews
//@desc   delete Latest news
//@access Public
router.delete("/:id", deleteLatestNews);
//@route  GET api/LatestNews
//@desc   Get Approved LatestNews
//@access public
router.get("/approved", getApprovedLatestNews);

//@route  GET api/LatestNews
//@desc   Get Approved LatestNews
router.get("/unapproved", auth, getUnapprovedLatestNews);

//@route  POST api/Workshops/approveLatestNews
//@desc   approve LatestNews
router.put("/approveLatestNews/:id", auth, approveLastestNews);

module.exports = router;
