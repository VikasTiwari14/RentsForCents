const express = require('express')
const router = express.Router()
const bcrypt=require('bcryptjs');
const jwt = require('jsonwebtoken');
const userCollection = require("../src/database/db")

router.get('/',(req,res)=>{
    res.status(200).send("HomePage")
})

router.get("/login")