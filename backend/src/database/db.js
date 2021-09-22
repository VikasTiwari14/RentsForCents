// import mongoose from 'mongoose'
const mongoose = require("mongoose")

mongoose.connect("mongodb+srv://harshitraj12:harshit@cluster0.d755c.mongodb.net/mainDB?retryWrites=true&w=majority").then(()=>console.log("connection Successful")).catch((err)=>console.log(err))

const address_schema = new mongoose.Schema({
        hNo:String,
        street:String,
        area : String,
        city: String,
        landmark:String,
        pinCode : String,
        state: String,
        country: String
})
const bank_schema = new mongoose.Schema({
    number: String,
    name:String,
    ifsc: String,
    bankName : String,
})
const document_schema = new mongoose.Schema({
    idType:String,
    idNumber:{
        type:String,
    },
    drivingLicense:{
        type:String,
    },
})
const idImage_schema = new mongoose.Schema({
    passbook:String,
    idImage:String,
    drivingLicenseImage:String,
    userImage:String,
    dobImage:String,
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
    gender:String,
})
const user = new mongoose.Schema({
    ID:Number,
    userDetails:user_schema,
    addressDetails: address_schema,
    bankDetails :bank_schema,
    documentDetails:document_schema,
    // bikeHistory:[
    //         {
    //             bookDate:Date,
    //             model:String
    //         }
    // ],
    idImage:idImage_schema,
    verified:Boolean,
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