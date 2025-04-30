// instance express, require express
const { readdirSync } = require("fs")
const express = require('express');
const { connectDb } = require("./connection");
const cors = require("cors")


const app = express();

// env file import
const dotenv = require("dotenv");

//dotenv binding
dotenv.config();

//Cors
app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true,
})
);
//json
app.use(express.json());

//PORT
const port = process.env.PORT || 5000

//Database connection
connectDb();

// Making routes 
app.get("/", (req, res) => {
    res.send("server is running.....")
})

//importing and using routes dynamically
readdirSync("./routes").map((route) => 
  app.use("/api", require(`./routes/${route}`))
);
// console.log(readdirSync("./routes"));

// types of requests
// 1. GET -> To get the data from the server
// 2. POST -> To post the data to the server
// 3. PUT -> To update the data on the server
// 4. DELETE -> To dete the data form the server


//Server listen
app.listen(port, () => {
    console.log(`server is running on ${port}`);
})