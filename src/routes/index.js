import userRoutes from "./user_routes/index.js";
import authRoutes from "./auth_routes/index.js";
import { Router } from "express";
import { upload } from "../middelwares/multer_middleware.js";
import { v2 as cloudinary } from "cloudinary";

const router = Router();

router.use("/users", userRoutes);
router.use("/auth", authRoutes);

router.post('/upload', upload.single('image'), async (req, res) => {
  try {
    // Upload image to Cloudinary
    if (!req.file) {
        throw new Error('No file uploaded');
    }
    const result = await cloudinary.uploader.upload(req.file.path , {
        folder: 'folder_name'
    });

    // Send the Cloudinary URL in the response
    res.json({ imageUrl: result.secure_url });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error uploading image to Cloudinary' });
  }
});

export default router;
