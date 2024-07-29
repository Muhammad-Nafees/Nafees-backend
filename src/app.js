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

 cloudinary.config({
    cloud_name: "dbuapin7c",
    api_key: "528941831148416",
    api_secret: "DRS_JQide4XGhin0KNP9QB44eAE",
  });


export default app;