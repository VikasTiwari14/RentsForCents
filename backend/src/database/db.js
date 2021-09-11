const mongoose = require('mongoose')

mongoose.connect("mongodb+srv://harshitraj12:harshit@cluster0.d755c.mongodb.net/mainDB?retryWrites=true&w=majority").then(()=>console.log("connection Successful")).catch((err)=>console.log(err))

const user = new mongoose.Schema({
    customerName:{
        type:String,
        trim:true
    },
    contactNumber:{
        type:Number,
        max:10,
        min:10,
        unique:true
    },
    email:{
        type:String,
        trim:true,
        unique:true
    },
    password:{
        type:String,
        trim:true,
    },
    uniqueId:{
        type:String,
        trim:true,
        unique:true
    },
    drivingLicenseId:{
        type:String,
        trim:true,
        unique:true
    },
    DOB:
    {
        type:Date,
    },
    registeredOn:{
        type: Date,
        default : Date.now   
    },
    registerToken:{
        type:String
    },
    loginToken:{
        type:String
    }
})

const userCollection = new mongoose.model("user",user)

module.exports = userCollection;