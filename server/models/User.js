const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
  {
    name: String,
    email: {
      type: String,
      required: true,
    },
    picture: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', UserSchema);
