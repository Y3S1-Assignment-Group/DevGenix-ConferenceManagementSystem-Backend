const express = require('express');
const router = express.Router();
const authReviewer = require('../middleware/authReviewer');

const {
  getApprovedResearchPapers,
  getUnapprovedResearchPapers,
} = require('../controllers/researchpapers.controller');

//@route  GET api/ResearchPapers
//@desc   Get Approved Research Papers
//@access public
router.get('/approved', getApprovedResearchPapers);

//@route  GET api/ResearchPapers
//@desc   Get Unapproved Research Papers
//@access public
router.get('/unapproved', getUnapprovedResearchPapers);

module.exports = router;
