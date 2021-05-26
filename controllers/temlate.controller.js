const Templates = require("../models/Templates.model");

//Add Latest news
const addTemplate = async (req, res) => {
  const { templateName, fileLink } = req.body;
  const approved = false;
  try {
    //create a Template
    const Temp = new Templates({
      templateName,
      fileLink,
      approved,
    });

    //save user to the database

    await Temp.save()
      .then((template) => res.json(template))
      .catch((err) => res.status(400).json("Error: " + err));
  } catch (err) {
    //Something wrong with the server
    console.log(err.message);
    return res.status(500).send("Server Error");
  }
};

const updateTemplate = async (req, res) => {
  try {
    Templates.findByIdAndUpdate(req.body.id)
      .then((existingTemplate) => {
        existingTemplate.templateName = req.body.templateName;
        existingTemplate.fileLink = req.body.fileLink;
        existingTemplate
          .save()
          .then(() => res.json("template updated!"))
          .catch((err) => res.status(400).json("Error: " + err));
      })
      .catch((err) => res.status(400).json("Error: " + err));
  } catch (err) {
    res.status(500).send("Server Error");
  }
};

const getTemplate = async (req, res) => {
  try {
    const Temp = await Templates.find();
    res.json(Temp);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
};

const deleteTemplate = async (req, res) => {
  try {
    Templates.findByIdAndDelete(req.params.id)
      .then(() => {
        res.status(200).json("Deleted");
      })
      .catch(() => {
        res.status(200).json("Server error, news was not deleted");
      });
  } catch (err) {
    res.status(500).send("Server Error");
  }
};

//Approved/Decline Template
const approveTemplate = async (req, res) => {
  try {
    Templates.findByIdAndUpdate(req.params.id)
      .then((existTemplatep) => {
        existTemplatep.approved = req.body.approved;
        existTemplatep
          .save()
          .then((response) => res.json(response))
          .catch((err) => res.status(400).json("Error: " + err));
      })
      .catch((err) => res.status(400).json("Error: " + err));
  } catch (err) {
    res.status(500).send("Server Error");
  }
};

//Approved Template List
const getApproveTemplatesList = async (req, res) => {
  try {
    const templates = await Templates.find({
      approved: true,
    });
    res.json(templates);
  } catch (err) {
    res.status(500).send("Server Error");
  }
};

module.exports = {
  addTemplate,
  updateTemplate,
  getTemplate,
  deleteTemplate,
  approveTemplate,
  getApproveTemplatesList,
};
