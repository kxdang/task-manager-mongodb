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
    required: true
  },
  email: {
    type: String,
    required: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Email is invalid");
      }
    }
  },
  age: {
    type: Number,
    validate(value) {
      if (value < 0) {
        throw new Error("age must be a positive number");
      }
    }
  }
});

const me = new User({
  name: "Kien",
  email: "mike@"
});

me.save()
  .then(() => {
    console.log(me);
  })
  .catch(error => {
    console.log("Error", error);
  });
