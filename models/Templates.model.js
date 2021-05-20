const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TemplateSchema = new Schema({
  paperTemplate: {
    WordLink: { type: String },
    UpdatedDate: { type: Date },
  },

  workshopTemplate: {
    WordLink: { type: String },
    pptxLink: { type: String },
    UpdatedDate: { type: Date },
  },
});

module.exports = Presenter = mongoose.model('Templates', TemplateSchema);
