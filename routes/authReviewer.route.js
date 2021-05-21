const express = require('express');
const router = express.Router();
const auth = require('../middleware/authReviewer');

const {
  getReviewerDetails,
  loginReviewer,
  registerReviewer,
  getAllReviewerDetails,
} = require('../controllers/authReviewer.controller');

//@route  POST api/authReviewer
//@desc   Register Reviewer
//@access Public
router.post('/register', registerReviewer);

//@route  POST api/authReviewer
//@desc   authenticate user and get token(login)
//@access Public
router.post('/', loginReviewer);

//@route  GET api/authReviewer
//@desc   Get Reviewer details using jwt
//@access Reviewer
//Route restricted with authetication (JWT Token)
router.get('/', auth, getReviewerDetails);

//@route  GET api/authReviewer/all
router.get("/all", getAllReviewerDetails);

module.exports = router;
