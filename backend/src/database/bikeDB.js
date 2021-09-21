const mongoose = require('mongoose')
mongoose.connect("mongodb+srv://harshitraj12:harshit@cluster0.d755c.mongodb.net/mainDB?retryWrites=true&w=majority").then(()=>console.log("Connection Successful")).catch((err)=>console.log(err))



const bike_schema = new mongoose.Schema({
    brandName:String,
    modelNumber:String,
    vehicleNumber:String,
    rate:Number,
    vehicleType:String,
    vehicleImage:String
})

const bike = new mongoose.model("bikeDetails",bike_schema)

module.exports=bike