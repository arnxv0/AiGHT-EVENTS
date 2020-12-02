const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");
const findOrCreate = require("mongoose-findorcreate");
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    googleID: {
      type: String,
      default: "",
      unique: true,
    },

    username: {
      type: String,
      unique: true,
      trim: true,
    },

    email: {
      type: String,
      unique: true,
      trim: true,
    },

    isOrganizer: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

UserSchema.plugin(passportLocalMongoose);
UserSchema.plugin(findOrCreate);

module.exports = User = mongoose.model("user", UserSchema);
