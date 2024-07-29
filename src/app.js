import express from "express";
import cors from "cors";
import allRoutes from "./routes/index.js";
import { v2 as cloudinary } from "cloudinary";

const app = express();

app.use(express.json({limit:"16kb"}));
app.use(cors({ origin: `${process.env.CORS_ORIGIN}`, credentials: true }));
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use("/api", allRoutes);



export default app;