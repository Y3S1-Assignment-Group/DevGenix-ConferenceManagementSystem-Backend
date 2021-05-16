const express = require("express");
const router = express.Router();
const auth = require("../middleware/authResearcher");
const {
  getResearcherDetails,
  registerResearcher,
  loginResearcher,
} = require("../controllers/authResearcher.controller");

//@route  POST api/authPresenter
//@desc   Register presenter
//@access Public
router.get("/", auth, getResearcherDetails);
router.post("/register", registerResearcher);
// router.post("/", loginResearcher);

module.exports = router;
