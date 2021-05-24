const { response } = require("express");
const Presenter = require("../models/Presenter.model");

//get Approved ResearchPapers
const getApprovedWorkshops = async (req, res) => {
  try {
    const workshops = await Presenter.find({
      "workshop.approved": true,
    }).select(
      "firstName lastName profileImg jobStatus universityOrWorkPlace workshop"
    );
    res.json(workshops);
  } catch (err) {
    res.status(500).send("Server Error");
  }
};
const getUnapprovedWorkshops = async (req, res) => {
  try {
    const workshops = await Presenter.find({
      "workshop.approved": false,
    }).select("firstName lastName jobStatus universityOrWorkPlace workshop");
    res.json(workshops);
  } catch (err) {
    res.status(500).send("Server Error");
  }
};

//Approved/Decline Workshops
const approveWorkshops = async (req, res) => {
  try {
    Presenter.findByIdAndUpdate(req.body.id)
      .then((existWorkshop) => {
        existWorkshop.workshop.approved = req.body.approved;
        existWorkshop
          .save()
          .then((response) => res.json(response))
          .catch((err) => res.status(400).json("Error: " + err));
      })
      .catch((err) => res.status(400).json("Error: " + err));
  } catch (err) {
    res.status(500).send("Server Error");
  }
};
module.exports = {
  getApprovedWorkshops,
  getUnapprovedWorkshops,
  approveWorkshops,
};
