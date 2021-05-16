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
  workshopAttends: [
    {
      workshopName: { type: String },
    },
  ],
  statementOfInterest: {
    type: String,
  },
  contactNumber: {
    type: String,
  },
  workshop: {
    workshopName: { type: String },
    description: { type: String },
    timeTo: { type: Date },
    timeFrom: { type: Date },
    date: { type: Date },
    powerpointLink: { type: String },
    submittedDate: { type: Date },
    approved: { type: Boolean },
  },
});

module.exports = Presenter = mongoose.model("Presenter", UserSchema);
