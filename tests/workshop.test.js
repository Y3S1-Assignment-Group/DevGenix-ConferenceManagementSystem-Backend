const mongoose = require("mongoose");
const supertest = require("supertest");
const workshopController = require("../controllers/workshops.controller");
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

test("GET all workshop data", async () => {
  const workshop = await workshopController.approveWorkshops();
  await supertest(app)
    .get("/api/Workshops/approved")
    .expect(200)
    .then((response) => {
      expect(response.body[0].firstName).toBe(workshop.firstName);
      expect(response.body[0].lastName).toBe(workshop.lastName);
    });
});
