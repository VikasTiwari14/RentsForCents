// import mongoose from 'mongoose'
const mongoose = require("mongoose")

mongoose.connect("mongodb+srv://harshitraj12:harshit@cluster0.d755c.mongodb.net/mainDB?retryWrites=true&w=majority").then(()=>console.log("connection Successful")).catch((err)=>console.log(err))

const address_schema = new mongoose.Schema({
        hNo:String,
        street:String,
        area : String,
        city: String,
        landmark:String,
        pinCode : Number,
        state: String,
        country: String
})
const bank_schema = new mongoose.Schema({
    number: String,
    name:String,
    ifsc: String,
    bankName : String,
    passbook:String
})
const document_schema = new mongoose.Schema({
    idType:String,
    idNumber:{
        type:String,
    },
    idImage:String,
    drivingLicense:{
        type:String,
    },
    drivingLicenseImage:String,
    userImage:String,
})

const user_schema = new mongoose.Schema({
    customerName:{
        type:String,
    },
    contactNumber:{
        type:Number,
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
    DOB:
    {
        type:Date,
    },
    dobImage:String,
    gender:String,
})
const user = new mongoose.Schema({
    ID:Number,
    userDetails:user_schema,
    addressDetails: address_schema,
    bankDetails :bank_schema,
    documentsDetails:document_schema,
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