const express = require("express");
const router = express.Router();
const auth = require("../middleware/authResearcher");
const {
  getResearcherDetails,
  registerResearcher,
  loginResearcher,
  getAllResearchers,
  approveReasearcherPayment,
} = require("../controllers/authResearcher.controller");

//@route  POST api/authPresenter
//@desc   Register presenter
//@access Public
router.get("/", auth, getResearcherDetails);
router.post("/register", registerResearcher);
router.post("/", loginResearcher);
router.get("/all", auth, getAllResearchers);
router.put("/approvePayment",auth, approveReasearcherPayment);

module.exports = router;
