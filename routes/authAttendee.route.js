const express = require("express");
const router = express.Router();
const auth = require("../middleware/authAttendee");
const { registerAttendee } = require("../controllers/authAttendee.controller");

//@route  POST api/authadmin
//@desc   Register Admin
//@access Public
router.post("/register", registerAttendee);

module.exports = router;
