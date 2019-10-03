require("../src/db/mongoose");
const task = require("../src/models/task");

task
  .findByIdAndRemove("5d94f65dbd83023414a4cb29")
  .then(tasks => {
    console.log(tasks);
    return task.countDocuments({ completed: false });
  })
  .then(result => {
    console.log(result);
  })
  .catch(e => {
    console.log(e);
  });
