const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/task-manager");

const User = mongoose.model("User", {
  name: {
    type: String,
  },
  age: {
    type: Number,
  },
  password:{
    type: String,
    required:true,
    trim: true,
    minLength: 7,
    validate(value){
        if(value.includes("password")){
            throw new Error("Cannot contain sub string 'password'")
        }
    }
  }
})
const me = new User({
  name: "Andrew",
  age: 27,
  password: "123password123"
});

me.save()
  .then((me) => {
    console.log(me);
  })
  .catch((error) => {
    console.log("Error", error);
  });


//const myclass=mongoose.model('newclass',{
//    id:{
//        type:Number
//    },
//    classof:{
//        type:String
//    }
//})//

//const user1=new myclass({
//    id:1,
//    classof:"10th"
//})//

//user1.save().then((result)=>{
//    console.log(result)
//}).catch((error)=>{
//    console.log("Error",error)
//})//
