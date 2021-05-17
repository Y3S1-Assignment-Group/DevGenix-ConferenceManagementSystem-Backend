const express = require("express");
const router = express.Router();
const auth = require("../middleware/authAttendee");

const {
    addPayment
} = require("../controllers/payment.controller");

//@route  POST api/Payment
//@desc   Do payment
//@access public
router.post("/", addPayment);


module.exports = router;
