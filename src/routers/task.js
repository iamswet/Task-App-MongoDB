const express = require("express");
const tasks = require("./../models/task");
const router = new express.Router();

router.post("/create-task", async (req, res) => {
  try {
    const task1 = new tasks(req.body);
    await task1.save(req.body);
    res.status(201).send(task1);
  } catch (error) {
    res.status(400).send(error);
  }
  //  const task1 = new tasks(req.body);
  //  task1
  //    .save()
  //    .then(() => {
  //      res.status(200).send(req.body);
  //    })
  //    .catch((error) => {
  //      res.status(400).send(error);
  //    });
});

router.get("/fetchtasks", async (req, res) => {
  try {
    const task1 = await tasks.find();
    res.send(task1);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.patch("/update-task/:id", async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["description", "completed"];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid Operation" });
  }

  try {
    const task = await tasks.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!task) {
      return res.send().status(400);
    }
    res.send(task).status(200);
  } catch (error) {
    res.send(error).status(400);
  }
});

router.delete("/delete-task/:id", async (req, res) => {
  try {
    const task1 = await tasks.findByIdAndDelete(req.params.id);
    if (!task1) {
      res.send().status(400);
    }
    res.send(task1).status(200);
  } catch (error) {
    res.send(error).status(400);
  }
});

module.exports = router;
