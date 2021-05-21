const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  role: {
    type: String,
  },
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
  },
  jobStatus: {
    type: String,
  },
  universityOrWorkPlace: {
    type: String,
  },
  contactNumber: {
    type: String,
  },
  profileImg: {
    type: String,
  },
  workshop: {
    workshopName: { type: String },
    workshopImage: { type: String },
    description: { type: String },
    timeTo: { type: String },
    timeFrom: { type: String },
    date: { type: Date },
    fileLink: { type: String },
    submittedDate: { type: Date },
    approved: { type: Boolean },
  },
});

module.exports = Presenter = mongoose.model("Presenter", UserSchema);
