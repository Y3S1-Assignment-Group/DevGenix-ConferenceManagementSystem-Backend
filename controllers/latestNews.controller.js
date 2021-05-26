const { response } = require("express");
const LatestNews = require("../models/LatestNews.model");

//Add Latest news
const addLatestNews = async (req, res) => {
  const { newsDate, message, hyperlink } = req.body;
  const approved = false;

  try {
    //create a user instance
    const LNews = new LatestNews({
      newsDate,
      message,
      hyperlink,
      approved,
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
    LatestNews.findByIdAndDelete(req.params.id)
      .then(() => {
        res.json("News Deleted");
      })
      .catch((err) => res.status(400).json("Error: " + err));
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

//get Approved LatestNews
const getApprovedLatestNews = async (req, res) => {
  try {
    const news = await LatestNews.find({
      approved: true,
    });
    res.json(news);
  } catch (err) {
    res.status(500).send("Server Error");
  }
};
const getUnapprovedLatestNews = async (req, res) => {
  try {
    const news = await LatestNews.find({
      approved: false,
    });
    res.json(news);
  } catch (err) {
    res.status(500).send("Server Error");
  }
};

//Approved/Decline LastestNews
const approveLastestNews = async (req, res) => {
  try {
    LatestNews.findByIdAndUpdate(req.params.id)
      .then((existLastestNews) => {
        existLastestNews.approved = req.body.approved;
        existLastestNews
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
  addLatestNews,
  updateLatestNews,
  deleteLatestNews,
  getLatestNews,
  getApprovedLatestNews,
  getUnapprovedLatestNews,
  approveLastestNews,
};
