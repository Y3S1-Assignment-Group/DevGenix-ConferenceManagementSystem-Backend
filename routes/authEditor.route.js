const express = require("express");
const router = express.Router();
const auth = require("../middleware/authEditor");
const {
  getEditorDetails,
  loginEditor,
  registerEditor,
  addConference,
} = require("../controllers/authEditor.controller");

//@route  POST api/authEditor
//@desc   Register editor
//@access Public
router.post("/register", registerEditor);

//@route  POST api/authEditor
//@desc   authenticate user and get token(login)
//@access Public
router.post("/", loginEditor);

// //@route  GET api/authEditor
// //@desc   Get editor details using jwt
// //@access Admin
// //Route restricted with authetication (JWT Token)
router.get("/", auth, getEditorDetails);

//@route  POST api/authEditor
//@desc   add conference
//@access Public
router.post("/addConference", auth, addConference);

module.exports = router;
