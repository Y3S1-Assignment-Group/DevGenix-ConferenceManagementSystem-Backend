const mongoose = require("mongoose");
const supertest = require("supertest");
const temlateController = require("../controllers/temlate.controller");
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
  const temlate = await temlateController.approveWorkshops();
  await supertest(app)
    .get("/api/Templates/approved")
    .expect(200)
    .then((response) => {
      expect(response.body[0].templateName).toBe(temlate.templateName);
      expect(response.body[0].fileLink).toBe(temlate.fileLink);
    });
});
