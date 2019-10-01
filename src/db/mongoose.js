const mongoose = require("mongoose");
const validator = require("validator");

mongoose.connect("mongodb://127.0.0.1:27017/task-manager-api", {
  useNewUrlParser: true,
  useCreateIndex: true
});

const tasks = mongoose.model("tasks", {
  description: {
    type: String
  },

  completed: {
    type: Boolean
  }
});

// const todayTask = new tasks({
//   description: "Complete Section 11 this week",
//   completed: false
// });

// todayTask
//   .save()
//   .then(() => {
//     console.log(todayTask);
//   })
//   .catch(error => {
//     console.log(error);
//   });

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

const me = new User({
  name: "Billy",
  email: "myemail@gmail.com",
  password: "Honey Bees Rock"
});

me.save()
  .then(() => {
    console.log(me);
  })
  .catch(error => {
    console.log("Error", error);
  });
