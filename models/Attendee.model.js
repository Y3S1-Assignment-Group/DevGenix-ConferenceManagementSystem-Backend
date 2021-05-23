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
  imgLink: {
    type: String,
  }
});
module.exports = Attendee = mongoose.model("Attendee", UserSchema);
