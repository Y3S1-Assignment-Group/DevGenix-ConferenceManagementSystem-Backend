const Researcher = require('../models/Researcher.model');

//get Approved ResearchPapers
const getApprovedResearchPapers = async (req, res) => {
  try {
    const researchPapers = await Researcher.find({
      'researchPaper.approved': true,
    }).select(
      'firstName lastName jobStatus universityOrWorkPlace researchPaper'
    );
    res.json(researchPapers);
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

//get Unapproved ResearchPapers
const getUnapprovedResearchPapers = async (req, res) => {
  try {
    const researchPapers = await Researcher.find({
      'researchPaper.approved': false,
    }).select(
      'firstName lastName jobStatus universityOrWorkPlace researchPaper'
    );
    res.json(researchPapers);
  } catch (err) {
    res.status(500).send('Server Error');
  }
};
module.exports = { getApprovedResearchPapers, getUnapprovedResearchPapers };
