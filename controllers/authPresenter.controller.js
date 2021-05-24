const bcrypt = require("bcryptjs");
const Presenter = require("../models/Presenter.model");
const jwt = require("jsonwebtoken");
const config = require("config");

//Register Presenter
const registerPresenter = async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    password,
    jobStatus,
    universityOrWorkPlace,
    profileImg,
    contactNumber,
    workshop,
  } = req.body;

  try {
    //See if user Exist
    let user = await Presenter.findOne({ email });

    if (user) {
      return res
        .status(400)
        .json({ errors: [{ msg: "Presenter already exist" }] });
    }

    const role = "presenter";

    //create a user instance
    user = new Presenter({
      role,
      firstName,
      lastName,
      email,
      password,
      jobStatus,
      universityOrWorkPlace,
      profileImg,
      contactNumber,
      workshop,
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

//get Presenter details
const getPresenterDetails = async (req, res) => {
  try {
    //get Presenter details
    //-password : dont return the pasword
    const user = await Presenter.findById(req.user.id).select("-password");
    res.json(user);
  } catch {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
};

//Authenticate admin and get token
const loginPresenter = async (req, res) => {
  const { email, password } = req.body;

  try {
    //See if user Exist
    let user = await Presenter.findOne({ email });

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

const getAllPresenters = async (req, res) => {
  try {
    const presenters = await Presenter.find();
    res.json(presenters);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
};

module.exports = {
  registerPresenter,
  getPresenterDetails,
  loginPresenter,
  getAllPresenters,
};
