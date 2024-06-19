const mongoose = require("mongoose");
const validator=require("validator")

const User = mongoose.model("User", {
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
  email:{
    type: String,
    trim: true,
    validate(value){
      if(!validator.isEmail(value)){
        throw new Error("Not a valid Email")
      }
    }
  }
});

module.exports = User;
