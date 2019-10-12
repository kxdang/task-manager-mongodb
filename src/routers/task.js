const express = require("express");
const router = new express.Router();
const auth = require("../middleware/auth");
const task = require("../models/task");

router.post("/tasks", auth, async (req, res) => {
  const newTask = new task({
    ...req.body,
    author: req.user._id
  });

  try {
    await newTask.save();
    res.status(201).send(newTask);
  } catch (e) {
    res.status(400).send(e);
  }
});

//Update a single task
router.patch("/tasks/:id", auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["description", "completed"];
  //prettier-ignore
  const isValidOperation = updates.every(update => allowedUpdates.includes(update))

  if (!isValidOperation) {
    return res
      .status(400)
      .send({ error: "Invalid updates because no key is found!" });
  }

  try {
    const singleTask = await task.findOne({
      _id: req.params.id,
      author: req.user._id
    });

    if (!singleTask) {
      return res.status(404).send();
    }
    updates.forEach(update => (singleTask[update] = req.body[update]));
    await singleTask.save();
    res.send(singleTask);
  } catch (e) {
    res.status(400).send(e);
  }
});

//get all tasks
router.get("/tasks", auth, async (req, res) => {
  try {
    const allTasks = await task.find({ author: req.user._id });
    res.send(allTasks);
  } catch (e) {
    res.status(500).send(e);
  }
});

//get a single task by ID
router.get("/tasks/:id", auth, async (req, res) => {
  const _id = req.params.id;

  try {
    const singleTask = await task.findOne({ _id, author: req.user._id });
    if (!singleTask) {
      return res.status(404).send();
    }
    res.send(singleTask);
  } catch (e) {
    res.status(500).send();
  }
});

//delete task
router.delete("/tasks/:id", auth, async (req, res) => {
  try {
    // const singleTask = await task.findByIdAndDelete(req.params.id);
    const singleTask = await task.findOneAndDelete({
      _id: req.params.id,
      author: req.user._id
    });

    if (!singleTask) {
      return res.status(404).send();
    }

    res.send(singleTask);
  } catch (e) {
    res.status(500);
  }
});

module.exports = router;
