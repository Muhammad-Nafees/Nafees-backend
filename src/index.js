dotenv.config();
import express from "express";
import dotenv from "dotenv";

const app = express();
const PORT = process.env.PORT || 3000;


app.get("/", (req, res) => {
  res.send("Hey Home");
});

app.listen(process.env.PORT, () => {
  console.log(`https://localhost:${PORT}`);
});
