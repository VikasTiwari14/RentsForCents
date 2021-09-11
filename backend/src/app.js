import dotenv from "dotenv"
dotenv.config();
import express, { urlencoded, json } from "express";
const app = express()
import path from 'path';
const port = process.env.PORT || 8000;
import cookieParser from 'cookie-parser';
import router from "../router/route.js";



app.use(urlencoded({extended:false}))
app.use(cookieParser())
app.use(json())
app.use(router)

app.listen(port, () => {
    console.log(`listening to the port no at ${port}`);
})
