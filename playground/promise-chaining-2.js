require("../src/db/mongoose");
const task = require("../src/models/task");

task
  .findByIdAndDelete("5d93de2974dce127a0c6c60d")
  .then(tasks => {
    return task.countDocuments({ completed: false });
  })
  .then(result => {
    console.log(`There are ${result} incompleted left`);
  })
  .catch(e => {
    console.log(e);
  });
