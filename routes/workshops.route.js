const express = require('express');
const router = express.Router();
const auth = require('../middleware/authReviewer');

const {
  getApprovedWorkshops,
  getUnapprovedWorkshops,
} = require('../controllers/workshops.controller');

//@route  GET api/Workshops
//@desc   Get Approved workshops
//@access public
router.get('/approved', getApprovedWorkshops);

//@route  GET api/Workshops
//@desc   Get Approved workshops
//@access public
router.get('/unapproved', auth, getUnapprovedWorkshops);

module.exports = router;
