const mongoose = require("mongoose");

const Schema = new mongoose.Schema({
  name: {
    required: true,
    type: String,
  },
  email: {
    type: String,
    required: true,
    match: /.+\@.+\..+/,
    unique: true,
  },
  isPromoted: {
    type: Boolean,
    default: null,
  },
});

module.exports = mongoose.model("Data", Schema);
