const express = require("express");
const router = new express.Router();
const task = require("../models/task");

//Update a single task
router.patch("/tasks/:id", async (req, res) => {
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
    const singleTask = await task.findById(req.params.id);

    updates.forEach(update => (singleTask[update] = req.body[update]));

    await singleTask.save();

    // const singleTask = await task.findByIdAndUpdate(req.params.id, req.body, {
    //   new: true,
    //   runValidators: true
    // });

    if (!singleTask) {
      return res.status(404).send();
    }

    res.send(singleTask);
  } catch (e) {
    res.status(400).send(e);
  }
});

//updating tasks
router.post("/tasks", async (req, res) => {
  const newTask = new task(req.body);

  try {
    await newTask.save();
    res.status(201).send(newTask);
  } catch (e) {
    res.status(400).send(e);
  }
});

//get all tasks
router.get("/tasks", async (req, res) => {
  try {
    const allTasks = await task.find({});
    res.send(allTasks);
  } catch (e) {
    res.status(500).send(e);
  }
});

//get a single task by ID
router.get("/tasks/:id", async (req, res) => {
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

//delete task
router.delete("/tasks/:id", async (req, res) => {
  try {
    const singleTask = await task.findByIdAndDelete(req.params.id);

    if (!singleTask) {
      return res.status(404).send();
    }

    res.send(singleTask);
  } catch (e) {
    res.status(500);
  }
});

module.exports = router;
