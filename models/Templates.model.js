const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TemplateSchema = new Schema({
  templateName: {
    type: String,
  },
  fileLink: {
    type: String,
  },
  approved: { type: Boolean },
});

module.exports = Presenter = mongoose.model("Templates", TemplateSchema);
