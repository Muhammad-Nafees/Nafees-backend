import express, { Router } from "express";
import {
  registerUser,
  login,
  deletaAll,
} from "../../controllers/auth_controller/index.js";

const router = express.Router();


router.delete("/deletaAll-users", deletaAll);


export default router;