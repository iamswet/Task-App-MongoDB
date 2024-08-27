const express = require("express");
const User = require("../models/user");
const auth = require("../middleware/auth");
const multer=require("multer")
const router = new express.Router();

//creating user
router.post("/create-user", async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();
    const token = await user.generateAuthToken();
    res.status(201).send({ user: user, token });
  } catch (error) {
    res.send(400).send(error);
  }

  //user1.save().then(()=>{
  //    res.status(200).send(req.body)
  //}).catch((error)=>{
  //    res.status(400).send(error)
  //})
});

//only authenticate login
router.post("/user/login", async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    const token = await user.generateAuthToken();
    //    res.status(200).send({user: user.getPublicProfile(), token})       we are using toJSON so no need to get public profile seperately
    res.status(200).send({ user, token });
  } catch (error) {
    return res.status(400).send(error);
  }
});

//fetch our own user ID
router.get("/users/me", auth, async (req, res) => {
  res.send(req.user);
});

router.post("/users/logout", auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token;
    });
    await req.user.save();
    res.send();
  } catch (error) {
    res.status(500).send(error);
  }
});

router.post("/users/logoutall", auth, async (req, res) => {
  try {
    req.user.tokens = [];
    await req.user.save();
    res.send();
  } catch (error) {
    res.status(500).send(error);
  }
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

/* 

We are removing this so that 1 user can't change fetch the data of other users (navigating to others accounts)

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
  });
*/

/** */
//update profile
//router.patch("/update-user/:id", async (req, res) => {
router.patch("/users/me", auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["name", "email", "password", "age"];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid request" });
  }

  try {
    updates.forEach((update) => {
      req.user[update] = req.body[update];
    });
    await req.user.save();
    res.send(req.user).status(200);
  } catch (error) {
    res.send(error).status(400);
  }
});

//  router.delete("/delete-user/:id", async (req, res) => {           specific user should be able to delete only their ID
//    const userdata = await User.findByIdAndDelete(req.params.id);   if we use the delete-users/:id
/*
    const userdata = await User.findByIdAndDelete(req.params.id);
    if (!userdata) {
      return res.status(404).send();
    }
 */

const upload=multer({
  data:'avatar'
})


router.post("/users/me/avatar",upload.single('avatar'),(req,res)=>{
  try{
    res.send()
  }catch(error){
    next(error)
  }
})

router.delete("/users/me", auth, async (req, res) => {
  try {
    //await req.user.remove()
    const userdata = await User.findByIdAndDelete(req.user._id);
    res.send(req.user);
  } catch (error) {
    console.log(error);
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

module.exports = router;
