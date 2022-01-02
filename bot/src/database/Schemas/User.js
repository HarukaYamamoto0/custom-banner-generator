const { Schema, model } = require("mongoose");

const schemaUser = new Schema({
  _id: { type: String, require: true },
  user: {
    username: { type: String, require: true },
    avatar: { type: String, require: true },
    device: { type: String, require: true },
    status: { type: String, require: true },
    about: { type: String, default: null }
  },
  theme1: {
    banner: { type: String, default: null },
    about: { type: String, default: null }
  }
});

const User = model("users", schemaUser);
module.exports = User;
