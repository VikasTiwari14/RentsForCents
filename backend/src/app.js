require('dotenv').config()
const express = require("express")
const app = express()
const path=require('path')
const port = process.env.PORT || 8000;
const cookieParser = require('cookie-parser')
const router = require("../router/route")



app.use(express.urlencoded({extended:false}))
app.use(cookieParser())
app.use(express.json())
app.use(router)

app.listen(port, () => {
    console.log(`listening to the port no at ${port}`);
})
