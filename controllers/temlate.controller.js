const { response } = require('express');
const Templates = require('../models/Templates.model');

//Add Latest news
const addTemplate = async (req, res) => {
  const { workshopTemplate, paperTemplate } = req.body;

  try {
    //create a Template
    const Temp = new Templates({
      workshopTemplate,
      paperTemplate,
    });

    //save user to the database
    await Temp.save();
    res.status(200).send('Template added successfully');
  } catch (err) {
    //Something wrong with the server
    console.log(err.message);
    return res.status(500).send('Server Error');
  }
};

const updateTemplate = async (req, res) => {
  try {
    Templates.findByIdAndUpdate(req.body.id)
      .then((existingTemplate) => {
        existingTemplate.workshopTemplate = req.body.workshopTemplate;
        existingTemplate.paperTemplate = req.body.paperTemplate;
        existingTemplate
          .save()
          .then(() => res.json('template updated!'))
          .catch((err) => res.status(400).json('Error: ' + err));
      })
      .catch((err) => res.status(400).json('Error: ' + err));
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

const getTemplate = async (req, res) => {
  try {
    const Temp = await Templates.find();
    res.json(Temp);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
};

module.exports = {
  addTemplate,
  updateTemplate,
  getTemplate,
};
