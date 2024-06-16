const express=require('express')
require('./db/mongoose')
const User=require("./models/user")

const app=express()
const port=process.env.PORT || 3000


app.use(express.json())


app.post('/test',(req,res)=>{
    const user1=new User(req.body)

    user1.save().then(()=>{
        res.status(200).send(req.body)
    }).catch((error)=>{
        res.status(400).send(error)
    }) 
})


app.listen(port,()=>{
    console.log(`Server is running on port ${port}`)
})