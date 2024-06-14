import userRoutes from "./user_routes/index.js"
import authRoutes from "./auth_routes/index.js"
import {Router} from "express"

const router = Router();


router.use("/users",userRoutes);
router.use("/auth",authRoutes);

export default router;