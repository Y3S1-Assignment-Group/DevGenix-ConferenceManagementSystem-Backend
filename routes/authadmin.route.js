const express = require("express");
const router = express.Router();
const auth = require("../middleware/authadmin");

const {
  getAdminDetails,
  loginAdmin,
  registerAdmin,
  approveConference,
} = require("../controllers/authadmin.controller");

//@route  POST api/authadmin
//@desc   Register Admin
//@access Public
router.post("/register", registerAdmin);

//@route  POST api/authadmin
//@desc   authenticate user and get token(login)
//@access Public
router.post("/", loginAdmin);

//@route  GET api/authadmin
//@desc   Get admin details using jwt
//@access Admin
//Route restricted with authetication (JWT Token)
router.get("/", auth, getAdminDetails);

//@route  PUT api/Conference/approvaldecision
//@desc   Approve conference
//@access public
router.put("/approveConference/:id", auth, approveConference);

module.exports = router;
