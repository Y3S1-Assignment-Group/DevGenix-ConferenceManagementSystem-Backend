const express = require("express");
const router = express.Router();
const auth = require("../middleware/authPresenter");
const { registerPresenter } = require("../controllers/authPresenter.controller");

//@route  POST api/authPresenter
//@desc   Register presenter
//@access Public
router.post("/register", registerPresenter);

module.exports = router;
