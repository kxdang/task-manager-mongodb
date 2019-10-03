require("../src/db/mongoose");
const task = require("../src/models/task");

// task
//   .findByIdAndDelete("5d93de2974dce127a0c6c60d")
//   .then(tasks => {
//     return task.countDocuments({ completed: false });
//   })
//   .then(result => {
//     console.log(`There are ${result} incompleted left`);
//   })
//   .catch(e => {
//     console.log(e);
//   });

const deleteTaskAndCount = async id => {
  const singleTask = await task.findByIdAndDelete(id);
  const countIncomplete = await task.countDocuments({ completed: false });
  return countIncomplete;
};

deleteTaskAndCount("5d94f69abd83023414a4cb2b")
  .then(count => {
    console.log(count);
  })
  .catch(e => {
    console.log(e);
  });
