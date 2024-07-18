const mongoose = require("mongoose");

const taskschema = mongoose.Schema({
  description: {
    type: String,
    required: true,
    trim: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  owner:{
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  }
});

const tasks = mongoose.model("tasks", taskschema);

module.exports = tasks;
