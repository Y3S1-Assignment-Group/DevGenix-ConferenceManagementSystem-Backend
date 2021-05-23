const Conference = require("../models/Conference.model");

//Add conference
const addConference = async (req, res) => {
  const { venue, confTitle, description, fromTime, toTime } = req.body;
  const approved = false;

  try {
    //create a conference instance
    conference = new Conference({
      venue,
      confTitle,
      description,
      fromTime,
      toTime,
      approved,
    });

    //save conference to db
    await conference
      .save()
      .then((conferenceObj) => res.json(conferenceObj))
      .catch((err) => res.status(400).json("Error: " + err));
  } catch (err) {
    //Something wrong with the server
    console.error(err.message);
    return res.status(500).send("Server Error");
  }
};

//update conference
const updateConference = async (req, res) => {
  try {
    const conference = await Conference.findById(req.params.id);

    if (conference != null) {
      Conference.findByIdAndUpdate(req.params.id).then((conference) => {
        conference.venue = req.body.venue;
        conference.confTitle = req.body.confTitle;
        conference.description = req.body.description;
        conference.fromTime = req.body.fromTime;
        conference.toTime = req.body.toTime;

        conference
          .save()
          .then(() => res.json("Conference updated!"))
          .catch((err) => res.status(400).json("Error: " + err));
      });
    }
  } catch (err) {
    //Something wrong with the server
    console.error(err.message);
    return res.status(500).send("Server Error");
  }
};

const getConference = async (req, res) => {
  try {
    const conferences = await Conference.find();
    res.json(conferences);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
};

//Approved/Decline Conference Details
const approveConferenceDetails = async (req, res) => {
  try {
    Conference.findByIdAndUpdate(req.params.id)
      .then((existConference) => {
        existConference.approved = req.body.approved;
        existConference
          .save()
          .then((response) => res.json(response))
          .catch((err) => res.status(400).json("Error: " + err));
      })
      .catch((err) => res.status(400).json("Error: " + err));
  } catch (err) {
    res.status(500).send("Server Error");
  }
};

//get Approved Conference Details
const getApprovedConferenceDetails = async (req, res) => {
  try {
    const conference = await Conference.find({
      approved: true,
    });
    res.json(conference);
  } catch (err) {
    res.status(500).send("Server Error");
  }
};

//get Unpproved Conference Details
const getUnapprovedConferenceDetails = async (req, res) => {
  try {
    const conference = await Conference.find({
      approved: false,
    });
    res.json(conference);
  } catch (err) {
    res.status(500).send("Server Error");
  }
};

module.exports = {
  addConference,
  updateConference,
  getConference,
  approveConferenceDetails,
  getApprovedConferenceDetails,
  getUnapprovedConferenceDetails,
};
