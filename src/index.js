const express = require("express");
require("./db/mongoose");
const userRouter = require("./routers/user");
const taskRouter = require("./routers/task");

//  /d/Language/NodeJS/mongo/mongodb/bin/mongod.exe --dbpath="/d/Language/NodeJS/mongo/mongodb-data"

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(userRouter)
app.use(taskRouter)

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
