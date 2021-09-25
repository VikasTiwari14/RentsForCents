const express = require('express')
const router = express.Router()
const bcrypt=require('bcryptjs');
const jwt = require('jsonwebtoken');
const userCollection = require("../src/database/db")
const contact_collection = require("../src/database/contactDB");
const bikeDetails = require('../src/database/bikeDB')
const managerCollection = require('../src/database/managerDB')
const auth = require('../middleware/managerAuth')
var unique_id = 1000

async function tokenGen(id){
    const token = jwt.sign({_id:id},"kjwehcbskhfwehwjefncwefyioenkejvaejgire")
    return token
}


router.get('/',(req,res)=>{
    res.status(200).send("HomePage")
})

router.get("/login",(req,res)=>{
    res.status(200).send("LoginPage")
})

// Login
router.post("/signin",async(req,res)=>{
    try{
        const userRegistered = await userCollection.findOne({'userDetails.email':req.body.email})
        if (userRegistered)
        {   
            const valid_password = await bcrypt.compare(req.body.password,userRegistered.userDetails.password);
            if(valid_password == true)
            {
                const token = await tokenGen(userRegistered._id)
                res.cookie("jwt",token,{expires:new Date(Date.now() + 600000),httpOnly:true})
                const updatedData = await userCollection.findByIdAndUpdate({_id:userRegistered._id},{$set:{loginToken:token}},{new:true})
                const response = {
                    data : updatedData,
                    status : true,
                    message: "Valid Credentials"
                }
                res.status(200).json(response)
            }
            else{
                res.status(400).json({
                    status:false,
                    message:"Invalid Credentials"
                })
            }
        }
        else{
            res.status(400).json({
                status:false,
                message:"User Not registered"
            })
        }
    }
    catch(err){
        res.status(422).json(err)
    }
    
})

// Register
router.post("/signup",async(req,res)=>{
    // const {customerName,contactNumber,email,password} = req.body
    if(req.body.addressDetails || req.body.bankDetails || req.body.documentDetails)
        {
            try{
                const userRegistered = await userCollection.findOne({'userDetails.email':req.body.userDetails.email})
                if (userRegistered){
                    return res.status(422).json({
                        status:false,
                        message:"user already registered"
                    })
                }
                else{
                    hashed_password = await bcrypt.hash(req.body.userDetails.password,12)
                    const userData = new userCollection({
                    ID:'',
                    userDetails:{
                        customerName:req.body.userDetails.fName,
                        contactNumber:req.body.userDetails.mobile,
                        email:req.body.userDetails.email,
                        password:hashed_password,
                        DOB:req.body.userDetails.dob,
                        dobImage:req.body.userDetails.dobImage,
                        gender:req.body.userDetails.gender,
                    },
                    addressDetails:{
                        hNo:req.body.addressDetails.hNo,
                        street:req.body.addressDetails.street,
                        area : req.body.addressDetails.area,
                        city: req.body.addressDetails.city,
                        landmark:req.body.addressDetails.landmark,
                        pinCode : req.body.addressDetails.pinCode,
                        state: req.body.addressDetails.state,
                        country: req.body.addressDetails.country
                    },
                    bankDetails:{
                        number: req.body.bankDetails.number,
                        name:req.body.bankDetails.name,
                        ifsc: req.body.bankDetails.ifsc,
                        bankName : req.body.bankDetails.bankName,
                        passbook: req.body.bankDetails.passbook
                    },
                    documentDetails:{
                        idType:req.body.documentDetails.idType,
                        idNumber:req.body.documentDetails.idNumber,
                        drivingLicense:req.body.documentDetails.drivingLicense,     
                        idImage:req.body.documentDetails.idImage,
                        drivingLicenseImage:req.body.documentDetails.drivingLicenseImage,
                        photo:req.body.documentDetails.photo
                    },
                    verified:false,
                    loginToken:''
                })
                    const token = await tokenGen(userData._id)
                    // res.cookie("jwt",token,{expires:new Date(Date.now() + 600000)})
                    const result = await userData.save()
                    availData = await userCollection.find().sort({_id:-1}).limit(1).skip(1)
                    if(availData.length!=0)
                    {
                        unique_id = Number(availData[0].ID) + 1
                    }
                    else
                    {
                        unique_id=1000
                    }            
                    const updatedData = await userCollection.findByIdAndUpdate({_id:userData._id},{$set:{registerToken:token,ID:unique_id}},{new:true})
                    res.status(200).json({
                        data:updatedData,
                        status:true,
                        message:"Registered"
                    })   
                }
            }
            catch(err){
                console.log(err)
                res.status(400).json(err)
            }
        }
    else{
        try{
            const userRegistered = await userCollection.findOne({'userDetails.email':req.body.userDetails.email})
            if (userRegistered){
                return res.status(422).json({
                    status:false,
                    message:"user already registered"
                })
            }
            else{
                hashed_password = await bcrypt.hash(req.body.userDetails.password,12)
                const userData = new userCollection({
                ID:'',
                userDetails:{
                    customerName:req.body.userDetails.fName,
                    contactNumber:req.body.userDetails.mobile,
                    email:req.body.userDetails.email,
                    password:hashed_password,
                },
                loginToken:''
                })
                const token = await tokenGen(userData._id)
                    // res.cookie("jwt",token,{expires:new Date(Date.now() + 600000)})
                const result = await userData.save()
                availData = await userCollection.find().sort({_id:-1}).limit(1).skip(1)
                if(availData.length!=0)
                {
                        unique_id = Number(availData[0].ID) + 1
                }
                else
                {
                        unique_id=1000
                }            
                const updatedData = await userCollection.findByIdAndUpdate({_id:userData._id},{$set:{registerToken:token,ID:unique_id}},{new:true})
                res.status(200).json({
                        data:updatedData,
                        status:true,
                        message:"Registered"
                })   
            }
        }
        catch(err){
            console.log(err)
            res.status(400).json(err)
        }
    }
})

// Save Feedback/Query
router.post('/contactUs',async(req,res)=>{
    const {name,email,phone,message} = req.body
    try{
        const data = new contact_collection({name,phone,email,message})
        const result = await data.save()
        res.status(200).json({
            status:200,
            message:'data saved successfully',
            data:result
        })
    }
    catch(err)
    {
        res.status(404).json({
            status:404,
            message:'Some error occured'
        })
    }
})


// Get the Feedback/Query data
router.get('/userFeedback',async(req,res)=>{
    try{
        const data = await contact_collection.find().sort({_id:-1})
        if(data)
        {
            res.status(200).json({
                status:200,
                message:'data found',
                data: data
            })
        }
        else{
            res.status(422).json({
                status:422,
                message:'No data is available'
            })
        }
    }
    catch(err){
        res.status(400).json({
            status:404,
            message:'Some error occured'
        })
    }
})

// get the Registered user data
router.get('/userData',async(req,res)=>{
    try{
        const data = await userCollection.find().sort({ID:-1}).select('-password')
        const count = await userCollection.find().count()
        if(data)
        {
            res.status(200).json({
                status:200,
                message:'data found',
                registeredUser:count,
                data: data
            })
        }
        else{
            res.status(422).json({
                status:422,
                message:'No data is available'
            })
        }
    }
    catch(err){
        res.status(400).json({
            status:404,
            message:'Some error occured'
        })
    }
})

// Save the bike Details
router.post('/addBike',async(req,res)=>{
    const {brandName,modelNumber,vehicleNumber,rate,vehicleImage} = req.body
    try{
        const data = new bikeDetails({brandName,modelNumber,vehicleNumber,rate,vehicleImage,available:true})
        const result = await data.save()
        res.status(200).json({
            status:200,
            message:'data saved successfully',
            data:result
        })
    }
    catch(err)
    {
        res.status(404).json({
            status:404,
            message:'Some error occured'
        })
    }
})

// / Get the Bike data
router.get('/getBike',async(req,res)=>{
    try{
        const data = await bikeDetails.find().sort({_id:-1})
        if(data)
        {
            res.status(200).json({
                status:200,
                message:'data found',
                data: data
            })
        }
        else{
            res.status(422).json({
                status:422,
                message:'No data is available'
            })
        }
    }
    catch(err){
        res.status(400).json({
            status:404,
            message:'Some error occured'
        })
    }
})


router.post('/managerLogin',async(req,res)=>{
    const {email,password} = req.body;
    try{
        const managerRegistered = await managerCollection.findOne({email:email})
        if (managerRegistered)
        {

            if(managerRegistered.password === password)
            {
                const token = await tokenGen(managerRegistered._id)
                res.cookie("manJwt",token,{expires:new Date(Date.now() + 600000),httpOnly:true})
                const updatedData = await managerCollection.findByIdAndUpdate({_id:managerRegistered._id},{$set:{loginToken:token}},{new:true})
                res.json({
                    status:200,
                    message:'Manager data found',
                    data:updatedData
                })
            }
            else{
                res.status(400).json({
                    status:false,
                    message:"Invalid Credentials"
                })
            }
        }
        else{
            res.status(400).json({
                status:false,
                message:"Invalid Credentials"
            })
        }
    }
    catch(err){
        res.status(422).json(err)
    }
})

router.get('/dashboard',async(req,res)=>{
    try{
        const countUsers = await userCollection.find().count()
        const verifiedUsers = await userCollection.find({verified:true}).count()
        const unVerifiedUsers = await userCollection.find({verified:false}).count()
        const countBikes = await bikeDetails.find().count()
        const availBike = await bikeDetails.find({available:true}).count() 
        const unAvailBike = await bikeDetails.find({available:false}).count() 
        res.status(200).json({
            status:true,
            message:'fetched all data',
            data:{
                countUsers,verifiedUsers,unVerifiedUsers,countBikes,availBike,unAvailBike
            }
        })
    }
    catch(err){
        res.status(400).json(err)
    }
})

// router.put('/update',(req,res)=>{
//     const {} = req.body
//     try{
//         const result_from_db= await userCollection.findOne({email:email})
//         if(result_from_db)
//         {
//             const update = await student_collection.findByIdAndUpdate({_id:result_from_db._id},{$set:{}},{new:true})
//         }
//     }
//     catch(err)
//     {
//         res.status(400).json({
//             status:404,
//             message:'Some error occured'
//         })
//     }
// })

// router.post('/add',async(req,res)=>{
//     const obj = {
//         model:req.body.model,
//         company:req.body.company
//     } 

//     const userRegistered = await userCollection.findOne({'userDetails.email':'harshitraj41122@gmail.com'})
//     // const update = await userCollection.findByIdAndUpdate({_id:userRegistered._id},{$push:{'bikes.bikeHistory':{$each:[{model:req.body.model}]}}},{new:true})
//     const update = await userCollection.findByIdAndUpdate({_id:userRegistered._id},{$push:{'bikes.bikeHistory':{$each:[obj]}}},{new:true})
//     res.json(update)
// })

module.exports=router;