import express, { Router } from "express";
import {
  registerUser,
  login,
} from "../../controllers/auth_controller/index.js";

const router = express.Router();


router.post("/register", registerUser);
router.post("/login", login);

export default router;

