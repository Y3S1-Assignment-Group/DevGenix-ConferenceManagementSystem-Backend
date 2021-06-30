const mongoose = require("mongoose");
const supertest = require("supertest");
const conferenceController = require("../controllers/conference.controller");
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

test("GET conference data", async () => {
  const conference = await conferenceController.approveWorkshops();
  await supertest(app)
    .get("/api/conference/approved")
    .expect(200)
    .then((response) => {
      expect(response.body[0].confTitle).toBe(conference.confTitle);
      expect(response.body[0].description).toBe(conference.description);
    });
});
