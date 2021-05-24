const express = require("express");
const router = express.Router();
const auth = require("../middleware/authPresenter");
const {
  registerPresenter,
  getPresenterDetails,
  loginPresenter,
  getAllPresenters,
} = require("../controllers/authPresenter.controller");

//@route  POST api/authPresenter
//@desc   Register presenter
//@access Public
router.get("/", auth, getPresenterDetails);
router.post("/register", registerPresenter);
router.post("/login", loginPresenter);
router.get("/all", auth, getAllPresenters);

module.exports = router;
