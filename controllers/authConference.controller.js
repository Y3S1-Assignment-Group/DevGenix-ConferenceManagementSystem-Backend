const bcrypt = require("bcryptjs");
const Editor = require("../models/Editor.model");
const jwt = require("jsonwebtoken");
const config = require("config");
const Conference = require("../models/Conference.model");

//Add conference
const addConference = async (req, res) => {
    const { date, venue, confTitle, description, fomTime, toTime} = req.body;
    const status = false;

    try {

      //create a conference instance
      conference = new Conference({
          date,
          venue,
          confTitle,
          description,
          fomTime,
          toTime,
          status,
      });      

      //save conference to db
      await conference.save();

      const payload = {
        conference: {
          id: conference.id,
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

    }catch (err) {
        //Something wrong with the server
        console.error(err.message);
        return res.status(500).send("Server Error");
    }
}

//update conference
const updateConference = async (req, res) => {
    const { id, date, venue, confTitle, description, fomTime, toTime} = req.body;

    try {

        const conference = await Conference.findById(req.params.id);

        if(conference != null){

            Conference.findByIdAndUpdate(req.params.id)
            .then((conference) => {
                conference.date = req.body.date;
                conference.venue = req.body.venue;
                conference.confTitle = req.body.confTitle;
                conference.description = req.body.description;
                conference.fomTime = req.body.fomTime;
                conference.toTime = req.body.toTime;
            
                conference
                .save()
                .then(() => res.json("Conference updated!"))
                .catch((err) => res.status(400).json("Error: " + err));
            });
        }
    }catch (err) {
        //Something wrong with the server
        console.error(err.message);
        return res.status(500).send("Server Error");
    }
}

module.exports = { addConference, updateConference };