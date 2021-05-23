const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ConferenceSchema = new Schema({
  venue: {
    type: String,
  },
  confTitle: {
    type: String,
  },
  description: {
    type: String,
  },
  fromTime: {
    type: Date,
  },
  toTime: {
    type: Date,
  },
  approved: {
    type: Boolean,
  },
});
module.exports = Conference = mongoose.model("Conference", ConferenceSchema);
