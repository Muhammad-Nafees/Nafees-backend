import userRoutes from "./user_routes/index.js";
import authRoutes from "./auth_routes/index.js";
import { Router } from "express";
import { upload } from "../middelwares/multer_middleware.js";
import { v2 as cloudinary } from "cloudinary";
import { Image_Upload_Modal } from "../models/image_Upload_Modal.js";

const router = Router();

router.use("/users", userRoutes);
router.use("/auth", authRoutes);

router.post("/upload", upload.single("image"), async (req, res) => {
  const { image } = req.body;
  try {
    // Upload image to Cloudinary
    const imageResult = await new Image_Upload_Modal({ image });
    // console.log("🚀 ~ router.post ~ imageResult:", imageResult);

    if (!req.file) {
      throw new Error("No file uploaded");
    };
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "folder_name",
    });
    console.log("🚀 ~ router.post ~ result:", result)
    // Send the Cloudinary URL in the response
    res.json({ imageUrl: result.secure_url });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error uploading image to Cloudinary" });
  }
});

export default router;
