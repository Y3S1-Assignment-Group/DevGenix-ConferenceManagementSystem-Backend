const mongoose = require("mongoose");
const supertest = require("supertest");
const latestNewsController = require("../controllers/latestNews.controller");
const express = require("express");
const app = express();

beforeEach((done) => {
  mongoose
    .connect(
      "mongodb+srv://devgenix:devgenix1998@devgenixsl.jmdfz.mongodb.net/devgenix?retryWrites=true&w=majority"
    )
    .then(() => {
      app.listen(5000, () => {
        console.log("Start on port 5000");
      });
    })
    .catch((err) => {
      console.log(err);
    });
  done();
});

afterEach((done) => {
  mongoose.connection.close(() => done());
});

test("GET all temlate data", async () => {
  const latestNews = await latestNewsController.approveWorkshops();
  await supertest(app)
    .get("/api/Templates/approved")
    .expect(200)
    .then((response) => {
      expect(response.body[0].message).toBe(latestNews.message);
      expect(response.body[0].hyperlink).toBe(latestNews.hyperlink);
    });
});
