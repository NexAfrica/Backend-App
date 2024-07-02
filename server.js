import mongoose from "mongoose";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";


import allRoutes from "./src/Routes/allRoutes.js"

mongoose.set('strictQuery', false)

// configuring dotenv
dotenv.config();
// create server instance
const app = express();
app.use(express.json());

// use of cors and body parse
app.use(cors({origin:'*'}))


// route - home route
app.get("/", (req, res)=> {
  res.status(200).send(`
  Welcome to our api home page
  `)
})

app.use("/", allRoutes)

// define some variables
const port = process.env.PORT;
const dataBase=process.env.MONGODB_URL

// database some variables
const con =()=> mongoose.connect(dataBase,{

    
  });

// instance to listen to our server
const startServer = ()=>app.listen(port);

Promise.all([con(), startServer()])
 .then(()=>{
  console.log(`MongoDB connected and server Is Running`);
 })
 .catch((err) =>console.log(err))

