const express = require("express");
require("./db/mongoose");
const User = require("./models/user");
const task = require("./models/task");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.post("/users", (req, res) => {
  const user = new User(req.body);

  user
    .save()
    .then(() => {
      res.status(201).send(user);
    })
    .catch(e => {
      res.status(400).send(e);
    });
});

//get all users
app.get("/users", (req, res) => {
  User.find({})
    .then(users => {
      res.send(users);
    })
    .catch(e => {
      res.status(500).send();
    });
});

//get a single user by id
app.get("/users/:id", (req, res) => {
  const _id = req.params.id;
  User.findById(_id)
    .then(user => {
      if (!user) {
        return res.status(404).send();
      }

      res.send(user);
    })
    .catch(e => {
      res.status(500).send();
    });
});

app.post("/tasks", (req, res) => {
  console.log(req.body);
  const newTask = new task(req.body);

  newTask
    .save()
    .then(() => {
      res.status(201).send(newTask);
    })
    .catch(e => {
      res.status(400).send(e);
    });
});

//get all tasks
app.get("/tasks", (req, res) => {
  task
    .find({})
    .then(tasks => res.send(tasks))
    .catch(e => {
      res.status(500).send(e);
    });
});

//get a single task by ID
app.get("/tasks/:id", (req, res) => {
  const _id = req.params.id;
  task
    .findById(_id)
    .then(task => {
      if (!task) {
        return res.status(404).send();
      }

      res.send(task);
    })
    .catch(e => {
      res.status(500).send();
    });
});

app.listen(port, () => {
  console.log("Server is up on port " + port);
});
