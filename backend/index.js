require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const Task = require("./models/task");

const errorHandler = (error, req, res, next) => {
  console.error(error.message);

  if (error.name === "CastError") {
    return res.status(400).send({ error: "malformatted id" });
  } else if (error.name === "ValidationError") {
    return res.status(400).json({ error: error.message });
  }

  next(error);
};

app.use(cors());
app.use(express.json());
/* app.use(express.static("dist")); */

app.get("/api/tasks", (req, res) => {
  Task.find({}).then((tasks) => {
    res.json(tasks);
  });
});

app.get("/api/tasks/:id", (req, res, next) => {
  Task.findById(req.params.id)
    .then((task) => {
      if (task) {
        res.json(task);
      } else {
        res.status(404).end();
      }
    })
    .catch((error) => next(error));
});

app.post("/api/tasks", (req, res, next) => {
  const body = req.body;

  const task = new Task({
    title: body.title,
    priority: body.priority,
    done: body.done,
    date: body.date,
  });

  task
    .save()
    .then((savedTask) => {
      res.json(savedTask);
    })
    .catch((error) => next(error));
});

app.put("/api/tasks/:id", (req, res, next) => {
  const { done } = req.body;

  Task.findByIdAndUpdate(
    req.params.id,
    { done },
    { new: true, runValidators: true, context: "query" },
  )
    .then((updatedTask) => {
      if (updatedTask) {
        res.json(updatedTask);
      } else {
        res.status(404).end();
      }
    })
    .catch((error) => next(error));
});

app.delete("/api/tasks/:id", (req, res, next) => {
  Task.findByIdAndDelete(req.params.id)
    .then(() => {
      res.status(204).end();
    })
    .catch((error) => next(error));
});

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: "unknown endpoint" });
};

app.use(unknownEndpoint);
app.use(errorHandler);

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log("Connected to port", PORT);
});
