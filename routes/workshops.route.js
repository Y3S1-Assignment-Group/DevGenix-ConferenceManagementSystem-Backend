const express = require("express");
const router = express.Router();

const {
    getApprovedWorkshops,
} = require("../controllers/workshops.controller");

//@route  GET api/Workshops
//@desc   Get Approved workshops
//@access public
router.get("/", getApprovedWorkshops);

module.exports = router;
