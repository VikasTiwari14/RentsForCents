const express = require('express')
const app = express()
const path=require('path')
const port = process.env.PORT || 8000;
const bodyParser = require('body-parser');

const cookieParser = require('cookie-parser')
// import router from "../router/route.js";
const router = require("../router/route")


app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true, parameterLimit: 50000}));
app.use(cookieParser())
app.use(express.json())
app.use(router)

app.listen(port, () => {
    console.log(`listening to the port no at ${port}`);
})
