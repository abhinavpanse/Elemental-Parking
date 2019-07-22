const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  carnumber: {
    type: String,
    required: true,
    unique: true
  },
  teacherid: {
    type: String
  }
});

module.exports = User = mongoose.model("user", UserSchema);
