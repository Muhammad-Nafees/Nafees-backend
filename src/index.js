import express from "express";
import dotenv from "dotenv";
import connectionDB from "./db/index.js";
import app from "./app.js";

dotenv.config({ path: ".env" });

connectionDB()
  .then(() => {
    app.listen(process.env.PORT || 3000, () => {
      console.log(`https://localhost:${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
});

// app.get("/",(req,res)=>{
//    res.json({message:"Wellcome Nafees Backend"})
// });