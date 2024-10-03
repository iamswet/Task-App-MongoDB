const express = require("express");
require("./db/mongoose");
const userRouter = require("./routers/user");
const taskRouter = require("./routers/task");
const multer = require("multer");

//  /d/Language/NodeJS/mongo/mongodb/bin/mongod.exe --dbpath="/d/Language/NodeJS/mongo/mongodb-data"
//66fd6e7c54ed028f5ac87af9

const app = express();
const port = process.env.PORT || 3000;

const upload = multer({
  dest: "images",

  //destination where the images is to be saved inside the file
});
app.post(
  "/upload",
  upload.single("upload"),
  (req, res) => {
    res.send("uploaded successfully");
  },
  (error, req, res, next) => {
    res.status(400).send({ error: error.message });
  }
);

app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
//
//const jwt=require('jsonwebtoken')
//const myjwt=async()=>{
//  const token=jwt.sign({id:'hey123'},'finishbysunday',{expiresIn:'5 seconds'  })
//  console.log(token)
//
//  const data=jwt.verify(token,'finishbysunday')
//  console.log(data)
//}
//
//myjwt()
//
