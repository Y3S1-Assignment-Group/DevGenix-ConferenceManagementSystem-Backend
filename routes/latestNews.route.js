const express = require('express');
const router = express.Router();
const auth = require('../middleware/authEditor');
const {
  addLatestNews,
  updateLatestNews,
  deleteLatestNews,
  getLatestNews,
} = require('../controllers/latestNews.controller');

//@route  GET api/LatestNews
//@desc   get Latest news
//@access Public
router.get('/', getLatestNews);

//@route  POST api/LatestNews
//@desc   add Latest news
//@access Public
router.post('/', auth, addLatestNews);
//@route  PUT api/LatestNews
//@desc   update Latest news
//@access Public
router.put('/', auth, updateLatestNews);
//@route  DELETE api/LatestNews
//@desc   delete Latest news
//@access Public
router.delete('/', auth, deleteLatestNews);

module.exports = router;
