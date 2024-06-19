const express = require("express");
const User=require('../models/user')
const router = new express.Router();


router.post("/create-user", async (req, res) => {
  const user1 = new User(req.body);
  try {
    
    await user1.save();
    res.status(201).send(user1);
  } catch (error) {
    res.send(400).send(error);
  }

  //user1.save().then(()=>{
  //    res.status(200).send(req.body)
  //}).catch((error)=>{
  //    res.status(400).send(error)
  //})
});

router.get("/fetchall", async (req, res) => {
  try {
    const usersdata = await User.find();
    res.send(usersdata);
  } catch (error) {
    res.status(400).send(error);
  }

  //User.find().then((users)=>{
  //    res.send(users)
  //}).catch((error)=>{
  //    res.status(400).send(error)
  //})
});

router.get("/fetch/:id", async (req, res) => {
  try {
    const userdata = await User.findById(req.params.id);
    if (!userdata) {
      return res.status(404).send();
    }
    res.send(userdata);
  } catch (error) {
    res.status(400).send(error);
  }

  router.patch("/update-user/:id", async (req, res) => {
    const updates=Object.keys(req.body)
    const allowedUpdates=['name','email','password','age']
    const isValidOperation=updates.every((update)=>allowedUpdates.includes(update))
    
    if(!isValidOperation){
      return res.status(400).send({error:'Invalid request'})
    }

    try {
      const user = await User.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      });
      if (!user) {
        return res.status(404).send();
      }
      res.send(user).status(200);
    } catch (error) {
      res.send(error).status(400);
    }
  });

  router.delete("/delete-user/:id", async (req, res) => {
    try {
      const userdata = await User.findByIdAndDelete(req.params.id);
      if (!userdata) {
        return res.status(404).send();
      }
      res.send(userdata);
    } catch (error) {
      res.status(400).send(error);
    }
  });

  //const id1=req.params.id
  //User.findById(id1).then((users)=>{
  //    if(!users){
  //        res.status(201).send()
  //    }
  //    res.send(users)
  //}).catch((error)=>{
  //    res.status(400).send(error)
  //})
});

module.exports = router;
