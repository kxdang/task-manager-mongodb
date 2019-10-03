require("../src/db/mongoose");
const User = require("../src/models/user");

// User.findByIdAndUpdate("5d94df9c9c2db62b4805af79", { age: 1 })
//   .then(user => {
//     console.log(user);
//     return User.countDocuments({ age: 1 });
//   })
//   .then(result => {
//     console.log(result);
//   })
//   .catch(e => {
//     console.log(e);
//   });

const updateAgeAndCount = async (id, age) => {
  const user = await User.findByIdAndUpdate(id, { age });
  const count = await User.countDocuments({ age });
  return count;
};

updateAgeAndCount("5d93db3a8a712554e8e5c63b", 44)
  .then(count => {
    console.log(count);
  })
  .catch(e => {
    console.log(e);
  });
