const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const NewsSchema = new Schema({
  
    newsDate: {
        type: Date,
    },
    message: {
        type: String,
    },
    hyperlink: {
        type: String,
    },

});

module.exports = Presenter = mongoose.model("LatestNews", NewsSchema);
