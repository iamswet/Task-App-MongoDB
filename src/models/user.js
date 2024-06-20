const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const userschema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minLength: 7,
    validate(value) {
      if (value.includes("password")) {
        throw new Error("Cannot contain sub string 'password'");
      }
    },
  },
  email: {
    type: String,
    trim: true,
    unique:true,
    required:true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Not a valid Email");
      }
    },
  },
});

userschema.statics.findByCredentials=async(email,password)=>{
  const user=await User.findOne({email})
  if(!user){
    throw new Error("Invalid input")
  }
  const isMatch=bcrypt.compare(password,user.password)
  if(!isMatch){
    throw new Error("Invalid input")
  }

  return user
}

//converting text password to bcrypt hash password
userschema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }

  next()
});

const User = mongoose.model("User", userschema);

module.exports = User;
