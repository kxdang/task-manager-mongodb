const express = require("express");
require("./db/mongoose");
const User = require("./models/user");
const task = require("./models/task");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.post("/users", async (req, res) => {
  const user = new User(req.body);

  try {
    await user.save();
    res.status(201).send(user);
  } catch (e) {
    res.status(400).send(e);
  }
});

//get all users
app.get("/users", async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (e) {
    res.status(500).send();
  }
});

//get a single user by id
app.get("/users/:id", async (req, res) => {
  const _id = req.params.id;

  try {
    const user = await User.findById(_id);

    if (!user) {
      return res.status(404).send;
    }

    res.send(user);
  } catch (e) {
    res.status(500).send();
  }
});

app.patch("/users/:id", async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["name", "email", "password", "age"];
  //prettier-ignore
  const isValidOperation = updates.every(update => allowedUpdates.includes(update));

  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid updates!" });
  }

  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!user) {
      return res.status(404).send();
    }
    res.send(user);
  } catch (e) {
    res.status(400).send(e);
  }
});

app.post("/tasks", async (req, res) => {
  const newTask = new task(req.body);

  try {
    await newTask.save();
    res.status(201).send(newTask);
  } catch (e) {
    res.status(400).send(e);
  }
});

//get all tasks
app.get("/tasks", async (req, res) => {
  try {
    const allTasks = await task.find({});
    res.send(allTasks);
  } catch (e) {
    res.status(500).send(e);
  }
});

//get a single task by ID
app.get("/tasks/:id", async (req, res) => {
  const _id = req.params.id;

  try {
    const singleTask = await task.findById({ _id });
    if (!singleTask) {
      return res.status(404).send();
    }
    res.send(singleTask);
  } catch (e) {
    res.status(500).send();
  }
});

app.listen(port, () => {
  console.log("Server is up on port " + port);
});
