const express = require("express")
const connectDB = require("./db/db")
const CORS = require("cors")
const clientModel = require("./model/client.model")
const app = express()


app.use(express.json())
app.use(CORS())

connectDB()

app.get("/",function(req,res){
    res.send("connected")
})

app.get("/getClients",async function(req,res){
    const response = await clientModel.find()
    if(response){
        res.send(response)
    }
})

app.post("/addClient",async function(req,res){
    try{const { name,lastName,email,mobile,project } = req.body
    const response = await clientModel.create({
        "name" : name,
        "lastName" : lastName,
        "email" : email,
        "mobile" : mobile,
        "project" : project
    })
    if(response){
        console.log("Created")
    }}
    catch(err){
        console.log(err)
    }
})

app.post("/delete",async function(req,res){
    try{const {email} = req.body
    const response  =  await clientModel.findOneAndDelete({
        "email" : email
    })
    if(response){
        console.log("DEleted")
    }}
    catch(err){
        console.log(err)
    }
})

app.post("/updateClient",async function(req,res){
    try{const {name,lastName,email,mobile,project} = req.body
    const response = await clientModel.updateOne({
        "name" : name
    },{
        "name" : name,
        "lastName" : lastName,
        "email" : email,
        "mobile" : mobile,
        "project" : project
    })}
    catch(err){
        console.log(err)
    }
})

app.listen(3000)