const bcrypt = require("bcryptjs");
const Attendee = require("../models/Attendee.model");
const jwt = require("jsonwebtoken");
const config = require("config");

//Register Attendee
const registerAttendee = async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    password,
    jobStatus,
    universityOrWorkPlace,
    workshopAttends,
    statementOfInterest,
  } = req.body;

  try {
    //See if user Exist
    let user = await Attendee.findOne({ email });

    if (user) {
      return res
        .status(400)
        .json({ errors: [{ msg: "Attendee already exist" }] });
    }

    const role = "attendee";

    //create a user instance
    user = new Attendee({
      role,
      firstName,
      lastName,
      email,
      password,
      jobStatus,
      universityOrWorkPlace,
      workshopAttends,
      statementOfInterest,
    });

    //Encrypt Password

    //10 is enogh..if you want more secured.user a value more than 10
    const salt = await bcrypt.genSalt(10);

    //hashing password
    user.password = await bcrypt.hash(password, salt);

    //save user to the database
    await user.save();

    //Return jsonwebtoken

    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(
      payload,
      config.get("jwtSecret"),
      { expiresIn: 360000 },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    //Something wrong with the server
    console.error(err.message);
    return res.status(500).send("Server Error");
  }
};

module.exports = { registerAttendee };
