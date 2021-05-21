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
  fomTime: {
    type: Date,
  },
  toTime: {
    type: Date,
  },
  status: {
    type: Boolean,
  },
});
module.exports = User = mongoose.model("Conference", ConferenceSchema);
