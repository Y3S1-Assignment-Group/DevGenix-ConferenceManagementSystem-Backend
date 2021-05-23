const bcrypt = require("bcryptjs");
const Attendee = require("../models/Attendee.model");
const jwt = require("jsonwebtoken");
const config = require("config");

//get Attendee details
const getAttendeeDetails = async (req, res) => {
  try {
    //get user details
    //-password : dont return the pasword
    const user = await Attendee.findById(req.user.id).select("-password");
    res.json(user);
  } catch {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
};

//Authenticate Attendee and get token ( Login )
const loginAttendee = async (req, res) => {
  const { email, password } = req.body;

  try {
    //See if user Exist
    let user = await Attendee.findOne({ email });

    if (!user) {
      return res.status(400).json({ errors: [{ msg: "Invalid Credentials" }] });
    }

    //match the user email and password

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ errors: [{ msg: "Invalid Credentials" }] });
    }

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
    contactNumber,
    paid,
    imgLink,
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
      contactNumber,
      paid,
      imgLink,
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

//get All Attendee details
const getAllAttendees = async (req, res) => {
  try {
    //get all user details
    //-password : dont return the pasword
    const users = await Attendee.find().select("-password");
    res.json(users);
  } catch {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
};

module.exports = {
  registerAttendee,
  getAttendeeDetails,
  loginAttendee,
  getAllAttendees,
};
