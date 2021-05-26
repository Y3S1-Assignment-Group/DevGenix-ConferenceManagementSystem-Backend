const bcrypt = require("bcryptjs");
const Researcher = require("../models/Researcher.model");
const jwt = require("jsonwebtoken");
const config = require("config");

//get Researcher details
const getResearcherDetails = async (req, res) => {
  try {
    //get user details
    //-password : dont return the pasword
    const user = await Researcher.findById(req.user.id).select("-password");
    res.json(user);
  } catch {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
};

//Authenticate Researcher and get token ( Login )
const loginResearcher = async (req, res) => {
  const { email, password } = req.body;

  try {
    //See if user Exist
    let user = await Researcher.findOne({ email });

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

//Register Researcher
const registerResearcher = async (req, res) => {
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
    researchPaper,
    profileImg,
  } = req.body;

  try {
    //See if user Exist
    let user = await Researcher.findOne({ email });

    if (user) {
      return res
        .status(400)
        .json({ errors: [{ msg: "Researcher already exist" }] });
    }

    const role = "researcher";

    //create a user instance
    user = new Researcher({
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
      researchPaper,
      profileImg,
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

const getAllResearchers = async (req, res) => {
  try {
    const researchers = await Researcher.find();
    res.json(researchers);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
};

const approveReasearcherPayment = async (req, res) => {
  try {
    Researcher.findByIdAndUpdate(req.body.id)
      .then((existingResearcher) => {
        existingResearcher.paid = req.body.paid;
        existingResearcher
          .save()
          .then((response) =>
              res.json(response)
          )
          .catch((err) => res.status(400).json("Error: " + err));
      })
      .catch((err) => res.status(400).json("Error: " + err));
  } catch (err) {
    res.status(500).send("Server Error");
  }
};

module.exports = {
  getResearcherDetails,
  registerResearcher,
  loginResearcher,
  getAllResearchers,
  approveReasearcherPayment,
};
