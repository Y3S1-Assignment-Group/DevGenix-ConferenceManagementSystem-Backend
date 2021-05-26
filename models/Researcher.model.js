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
  paid: {
    type: Boolean,
  },
  researchPaper: {
    paperTitle: { type: String },
    description: { type: String },
    paperLink: { type: String },
    submittedDate: { type: Date },
    approved: { type: Boolean },
  },
  profileImg: {
    type: String,
  }
});

module.exports = Researcher = mongoose.model("Researcher", UserSchema);

