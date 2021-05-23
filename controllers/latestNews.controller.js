const { response } = require("express");
const LatestNews = require("../models/LatestNews.model");

//Add Latest news
const addLatestNews = async (req, res) => {
  const { newsDate, message, hyperlink } = req.body;

  try {
    //create a user instance
    const LNews = new LatestNews({
      newsDate,
      message,
      hyperlink,
    });

    //save user to the database
    await LNews.save()
      .then((news) => res.json(news))
      .catch((err) => res.status(400).json("Error: " + err));
  } catch (err) {
    //Something wrong with the server
    console.log(err.message);
    return res.status(500).send("Server Error");
  }
};

const updateLatestNews = async (req, res) => {
  try {
    LatestNews.findByIdAndUpdate(req.body.id)
      .then((existingLatestNews) => {
        existingLatestNews.newsDate = req.body.newsDate;
        existingLatestNews.message = req.body.message;
        existingLatestNews.hyperlink = req.body.hyperlink;
        existingLatestNews
          .save()
          .then(() => res.json("Latest newsupdated!"))
          .catch((err) => res.status(400).json("Error: " + err));
      })
      .catch((err) => res.status(400).json("Error: " + err));
  } catch (err) {
    res.status(500).send("Server Error");
  }
};

const deleteLatestNews = async (req, res) => {
  try {
    LatestNews.findByIdAndDelete(req.body.id)
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

const getLatestNews = async (req, res) => {
  try {
    const LNews = await LatestNews.find();
    res.json(LNews);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
};

module.exports = {
  addLatestNews,
  updateLatestNews,
  deleteLatestNews,
  getLatestNews,
};
