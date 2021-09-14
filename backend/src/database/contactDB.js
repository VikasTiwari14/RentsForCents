const mongoose = require('mongoose')
mongoose.connect("mongodb+srv://harshitraj12:harshit@cluster0.d755c.mongodb.net/mainDB?retryWrites=true&w=majority").then(()=>console.log("Connection Successful")).catch((err)=>console.log(err))



const contact_schema = new mongoose.Schema({
    name:{
        type:String,
        trim:true
    },
    email:{
        type:String,
        trim:true
        
    },
    phone:Number,
    message:String,
    messageReceived:{
        type:Date,
        default: Date.now
    }
})

const contact = new mongoose.model("queryFeedback",contact_schema)

module.exports=contact