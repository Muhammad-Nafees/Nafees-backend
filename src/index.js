import express from "express";
import dotenv from "dotenv";
import connectionDB from "./db/index.js";

dotenv.config({path:".env"});
const app = express();
const PORT = process.env.PORT || 3000;
connectionDB();

app.listen(PORT, () => {
  console.log(`https://localhost:${PORT}`);
});