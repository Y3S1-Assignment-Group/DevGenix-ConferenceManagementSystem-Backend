const express = require("express");
const router = express.Router();
const auth = require("../middleware/authReviewer");

const {
  getApprovedResearchPapers,
  getUnapprovedResearchPapers,
  approvalDecision,
} = require("../controllers/researchpapers.controller");

//@route  GET api/ResearchPapers/approved
//@desc   Get Approved Research Papers
//@access public
router.get("/approved", getApprovedResearchPapers);

//@route  GET api/ResearchPapers/unapproved
//@desc   Get Unapproved Research Papers
//@access public
router.get("/unapproved", auth, getUnapprovedResearchPapers);

//@route  POST api/ResearchPapers/approvaldecision
//@desc   Get Unapproved Research Papers
//@access public
router.put("/approvaldecision", auth, approvalDecision);

module.exports = router;
