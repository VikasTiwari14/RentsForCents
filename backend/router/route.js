const express = require('express')
const router = express.Router()
const bcrypt=require('bcryptjs');
const jwt = require('jsonwebtoken');
const userCollection = require("../src/database/db")
const contact_collection = require("../src/database/contactDB")

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

router.post("/signin",async(req,res)=>{
    const {email,password} = req.body;
    try{
        const userRegistered = await userCollection.findOne({email:email})
        if (userRegistered)
        {
            const valid_password = await bcrypt.compare(password,userRegistered.password);
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

router.post("/signup",async(req,res)=>{
    const {customerName,contactNumber,email,password} = req.body

    try{
        const userRegistered = await userCollection.findOne({email:email})
        if (userRegistered){
            return res.status(422).json({
                status:false,
                message:"user already registered"
            })
        }
        else{
            hashed_password = await bcrypt.hash(password,12)
            const userData = new userCollection({customerName,contactNumber,email,password:hashed_password,uniqueId:email,drivingLicenseId:email,DOB:"",loginToken:customerName})
            const token = await tokenGen(userData._id)
            // res.cookie("jwt",token,{expires:new Date(Date.now() + 600000)})
            const result = await userData.save()
            const updatedData = await userCollection.findByIdAndUpdate({_id:userData._id},{$set:{registerToken:token}},{new:true})
            res.status(200).json({
                data:updatedData,
                status:true,
                message:"Registered"
            })   
        }
    }
    catch(err){
        res.status(400).json(err)
        // console.log(err)
    }
})

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
        console.log(err)
        res.status(404).json({
            status:404,
            message:'Some error occured'
        })
    }
})
module.exports=router;