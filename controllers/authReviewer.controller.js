const bcrypt = require('bcryptjs');
const Reviewer = require('../models/Reviewer.model');
const jwt = require('jsonwebtoken');
const config = require('config');

//get All Reviewer details
const getAllReviewerDetails = async (req, res) => {
  try {
    //get all Reviewer details
    //-password : dont return the pasword
    const Rev = await Reviewer.find().select("-password");
    res.json(Rev);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
};

//get Reviewer details
const getReviewerDetails = async (req, res) => {
  try {
    //get Reviewer details
    //-password : dont return the pasword
    const user = await Reviewer.findById(req.user.id).select('-password');
    res.json(user);
  } catch {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
};

//Authenticate Reviewer and get token
const loginReviewer = async (req, res) => {
  const { email, password } = req.body;

  try {
    //See if user Exist
    let user = await Reviewer.findOne({ email });

    if (!user) {
      return res.status(400).json({ errors: [{ msg: 'Invalid Credentials' }] });
    }

    //match the user email and password

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ errors: [{ msg: 'Invalid Credentials' }] });
    }

    //Return jsonwebtoken

    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(
      payload,
      config.get('jwtSecret'),
      { expiresIn: 360000 },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    //Something wrong with the server
    console.error(err.message);
    return res.status(500).send('Server Error');
  }
};

//Register Reviewer
const registerReviewer = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  try {
    //See if user Exist
    let user = await Reviewer.findOne({ email });

    if (user) {
      return res
        .status(400)
        .json({ errors: [{ msg: 'Reviewer already exist' }] });
    }

    const role = 'reviewer';

    //create a user instance
    user = new Reviewer({
      role,
      firstName,
      lastName,
      email,
      password,
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
      config.get('jwtSecret'),
      { expiresIn: 360000 },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    //Something wrong with the server
    console.error(err.message);
    return res.status(500).send('Server Error');
  }
};

module.exports = { getReviewerDetails, loginReviewer, registerReviewer,getAllReviewerDetails };
