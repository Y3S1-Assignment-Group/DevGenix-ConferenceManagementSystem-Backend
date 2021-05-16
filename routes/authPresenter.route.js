const express = require("express");
const router = express.Router();
const auth = require("../middleware/authPresenter");
const { registerPresenter , getPresenterDetails , loginPresenter} = require("../controllers/authPresenter.controller");

//@route  POST api/authPresenter
//@desc   Register presenter
//@access Public
router.get("/",auth, getPresenterDetails);
router.post("/register", registerPresenter);
router.post("/login", loginPresenter);

module.exports = router;
