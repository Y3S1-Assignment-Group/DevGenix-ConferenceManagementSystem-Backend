const express = require("express");
const router = express.Router();
const auth = require("../middleware/authEditor");
const authAdmin = require("../middleware/authadmin");

const {
  addConference,
  updateConference,
  getConference,
  approveConferenceDetails,
  getApprovedConferenceDetails,
  getUnapprovedConferenceDetails,
} = require("../controllers/conference.controller");

//@route  POST api/conference
//@desc   add conference
//@access Editor
router.post("/", auth, addConference);

//@route  PUT api/conference
//@desc   update conference
//@access Editor
router.put("/:id", auth, updateConference);

//@route  GET api/conference
//@desc   get all conference
//@access Public
router.get("/", getConference);

//@route  POST api/Workshops/approveWorkshop
//@desc   approve Workshops
//@access public
router.put("/approveconference/:id", authAdmin, approveConferenceDetails);

//@route  GET api/conference/approved
//@desc   get all approved conference
//@access Public
router.get("/approved", getApprovedConferenceDetails);

//@route  GET api/conference/unapproved
//@desc   get all unapproved conference
//@access Public
router.get("/unapproved", getUnapprovedConferenceDetails);

module.exports = router;
