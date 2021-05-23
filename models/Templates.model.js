const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TemplateSchema = new Schema({
  templateName: {
    type: String,
  },
  fileLink: {
    type: String,
  },
});

module.exports = Presenter = mongoose.model("Templates", TemplateSchema);
