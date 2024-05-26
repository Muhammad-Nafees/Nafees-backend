import express, { Router } from "express";
import {
  registerUser,
  login,
  deletaAll,
} from "../controllers/userControllers.js";

const router = express.Router();

router.post("/registerUser", registerUser);
router.post("/login", login);
router.delete("/deletaAll-users", deletaAll);

export default router;
