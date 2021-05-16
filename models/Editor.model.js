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
});
module.exports = User = mongoose.model("Editor", UserSchema);
