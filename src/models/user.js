const mongoose = require("mongoose");
const validator = require("validator");

const User = mongoose.model("User", {
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Email is invalid");
      }
    }
  },
  age: {
    type: Number,
    default: 0,
    validate(value) {
      if (value < 0) {
        throw new Error("age must be a positive number");
      }
    }
  },
  password: {
    type: String,
    required: true,
    trim: true,
    validate(value) {
      if (validator.isLength(value, { min: 6, max: undefined })) {
        if (value.toLowerCase().includes("password", 0)) {
          throw new Error("Cannot contain password as pw");
        }
      } else {
        throw new Error("Not long enough, must be 6 characters");
      }
    }
  }
});

module.exports = User;
