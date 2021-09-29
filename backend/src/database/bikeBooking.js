const mongoose = require("mongoose")

mongoose.connect("mongodb+srv://harshitraj12:harshit@cluster0.d755c.mongodb.net/mainDB?retryWrites=true&w=majority").then(()=>console.log("connection Successful")).catch((err)=>console.log(err))


const bikeBook_Schema = new mongoose.Schema({
        userID:String,
        name:String,
        vehicleNumber:String,
        bookingId:String,
        modelNumber:String,
        brandName:String,
        requestedAt:{
                type: Date,
                default : Date.now   
            },
        bookedAt: String,
        returnedAt:String,
        bookingDuration:String,
        confirm:Boolean,
        rate:Number,
        price:Number
})


const bookingCollection = new mongoose.model("bikeBooking",bikeBook_Schema)
module.exports = bookingCollection;

