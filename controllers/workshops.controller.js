const Presenter = require('../models/Presenter.model');

//get Approved ResearchPapers
const getApprovedWorkshops = async (req, res) => {
  try {
    const workshops = await Presenter.find({
      'workshop.approved': true,
    }).select('firstName lastName jobStatus universityOrWorkPlace workshop');
    res.json(workshops);
  } catch (err) {
    res.status(500).send('Server Error');
  }
};
const getUnapprovedWorkshops = async (req, res) => {
  try {
    const workshops = await Presenter.find({
      'workshop.approved': false,
    }).select('firstName lastName jobStatus universityOrWorkPlace workshop');
    res.json(workshops);
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

module.exports = { getApprovedWorkshops, getUnapprovedWorkshops };
