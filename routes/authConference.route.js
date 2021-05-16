const express = require("express");
const router = express.Router();
const auth = require("../middleware/authEditor");
const {
  addConference,
  updateConference,
} = require("../controllers/authConference.controller");

//@route  POST api/authEditor
//@desc   add conference
//@access Public
router.post("/conference", auth, addConference);

//@route  PUT api/authEditor
//@desc   update conference
//@access Public
router.put("/conference/:id", auth, updateConference);

module.exports = router;