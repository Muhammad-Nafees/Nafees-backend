import express from "express";
import cors from "cors";
import allRoutes from "./routes/index.js";

const app = express();

app.use(express.json({limit:"16kb"}));
app.use(cors({ origin: `${process.env.CORS_ORIGIN}`, credentials: true }));
app.use(express.urlencoded({ extended: true }));
app.use(express.static("Public"));
app.use("/api", allRoutes);   



export default app;