const express = require("express");
const router = express.Router();
const auth = require("../middleware/authAttendee");
const {
  registerAttendee,
  getAttendeeDetails,
  loginAttendee,
  getAllAttendees,
} = require("../controllers/authAttendee.controller");

//@route  POST api/authattendee
//@desc   Register Attendee
//@access Public
router.post("/register", registerAttendee);

//@route  POST api/authattendee
//@desc   authenticate user and get token(login)
//@access Public
router.post("/", loginAttendee);

//@route  GET api/authattendee
//@desc   Get Attendee details using jwt
//@access Attendee
//Route restricted with authetication (JWT Token)
router.get("/", auth, getAttendeeDetails);

//@route  GET api/authattendee
//@desc   Get Attendee details using jwt
//@access Attendee
//Route restricted with authetication (JWT Token)
router.get("/all", auth, getAllAttendees);

module.exports = router;
