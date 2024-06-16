const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/task-manager");

//const me = new User({
//  name: "Andrew",
//  age: 27,
//  password: "123passd123"
//});
//
//me.save()
//  .then((me) => {
//    console.log(me);
//  })
//  .catch((error) => {
//    console.log("Error", error);
//  });
//

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
