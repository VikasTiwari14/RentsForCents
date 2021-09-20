// import mongoose from 'mongoose'
const mongoose = require("mongoose")

mongoose.connect("mongodb+srv://harshitraj12:harshit@cluster0.d755c.mongodb.net/mainDB?retryWrites=true&w=majority").then(()=>console.log("connection Successful")).catch((err)=>console.log(err))

const address_schema = new mongoose.Schema({
        address : String,
        city: String,
        pinCode : Number,
        state: String,
        country: String
})
const bank_schema = new mongoose.Schema({
    accountNo: String,
    IFSC: String,
    branchName : String
})

const user = new mongoose.Schema({
    ID:Number,
    customerName:{
        type:String,
        trim:true
    },
    contactNumber:{
        type:Number,
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
    address: address_schema,
    bankDetails :bank_schema,
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

// export default userCollection;
module.exports = userCollection;