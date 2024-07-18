const express = require("express");
const tasks = require("./../models/task");
const auth = require("../middleware/auth");
const router = new express.Router();

router.post("/create-task", auth, async (req, res) => {
  //const task1 = new tasks(req.body);
  const task1 = new tasks({
    ...req.body,
    owner: req.user._id,
  });
  try {
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

router.get("/fetchtasks",auth ,async (req, res) => {
  try {
    const task1 = await tasks.find({owner:req.user._id});
    res.send(task1);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get("/tasks/:id", auth, async (req, res) => {
  const _id = req.params.id;
  try {
    const task = await tasks.findOne({ _id, owner: req.user._id });
    if (!task) {
      return res.status(404).send();
    }
  } catch (error) {
    res.status(500).send();
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
    const taskinconsider = await tasks.findById(req.params.id);
    updates.forEach((update) => {
      taskinconsider[update] = req.body[update];
    });
    await taskinconsider.save();

    //const task = await tasks.findByIdAndUpdate(req.params.id, req.body, {new: true,runValidators: true,});
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
