const express = require("express");
require("./db/mongoose");

const userRouter = require("./routers/user");
const taskRouter = require("./routers/task");

const app = express();
const port = process.env.PORT || 3000;

// app.use((req, res, next) => {
//   if (req.method === "GET") {
//     res.send("GET requests are disabled");
//   } else {
//     next();
//   }
// });

// app.use((req, res, next) => {
//   res.status(503).send("Website under construction");
//   next();
// });

app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

app.listen(port, () => {
  console.log("Server is up on port " + port);
});

const Task = require("./models/task");
const User = require("./models/user");

const main = async () => {
  // const task = await Task.findById("5da2208fbc13954da4ffec93");
  // await task.populate("author").execPopulate(); //finds a user associated with this task
  // console.log(task.author);
  try {
    const user = await User.findById("5da21fa945866d3f78ec9d56");
    await user.populate("tasks").execPopulate();
  } catch {}
};

main();
