require("../src/db/mongoose");
const User = require("../src/models/user");

User.findByIdAndUpdate("5d94df9c9c2db62b4805af79", { age: 1 })
  .then(user => {
    console.log(user);
    return User.countDocuments({ age: 1 });
  })
  .then(result => {
    console.log(result);
  })
  .catch(e => {
    console.log(e);
  });

const updateAgeAndCount = async (id, age) => {
  const user = await User.findByIdAndUpdate(id, { age });
};
