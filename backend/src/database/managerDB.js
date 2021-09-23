const mongoose = require("mongoose")

mongoose.connect("mongodb+srv://harshitraj12:harshit@cluster0.d755c.mongodb.net/mainDB?retryWrites=true&w=majority").then(()=>console.log("connection Successful")).catch((err)=>console.log(err))

const manager_schema = new mongoose.Schema({
    name:String,
    email:String,
    password:String,
    mobile:Number
})


const managerCollection = new mongoose.model("managerCredentials",manager_schema)

module.exports = managerCollection;