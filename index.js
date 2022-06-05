const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");

const app = express();
dotenv.config();


const port =8800
console.log(port)
const a = 2
const b = 5;
const result = b-a;



app.listen(port, ()=>{
    console.log(`Backend server 💻️ is running 🏃 on port ${port}....`)
})
