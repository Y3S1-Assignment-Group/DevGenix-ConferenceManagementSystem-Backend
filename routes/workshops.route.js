const express = require('express');
const router = express.Router();
const auth = require('../middleware/authReviewer');

const {
  getApprovedWorkshops,
  getUnapprovedWorkshops,
  approveWorkshops,
} = require('../controllers/workshops.controller');

//@route  GET api/Workshops
//@desc   Get Approved workshops
//@access public
router.get('/approved', getApprovedWorkshops);

//@route  GET api/Workshops
//@desc   Get Approved workshops
//@access public
router.get('/unapproved', auth, getUnapprovedWorkshops);

//@route  POST api/Workshops/approveWorkshop
//@desc   approve Workshops
//@access public
router.put("/approveWorkshop", auth, approveWorkshops);

module.exports = router;
