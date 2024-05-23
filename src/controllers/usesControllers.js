import { UserModal } from "../models/user.Modal.js";
import { parseBody, tokenGenerate } from "../utils/index.js";
import { compare, hash } from "bcrypt";
import { registerSchema } from "../validations/authValidation.js";

export const registerUser = async (req, res, next) => {
  try {
    const body = parseBody(req.body);
    await registerSchema.validateAsync(body);
    console.log("🚀 ~ registerUser ~ body:", body);
    // Create a new instance of UserModal with user data
    const user = new UserModal(body);

    const accessToken = tokenGenerate(user?._id);

    const hashedPassword = await hash(body.password, 10);
    body.password = hashedPassword;
    console.log("🚀 ~ registerUser ~ hashedPassword:", hashedPassword);

    const savedUser = await user.save();

    // Send a success response
    res.status(201).json({
      message: "User registered successfully",
      user: savedUser,
      token: accessToken,
    });
  } catch (error) {
    // Handle any errors
    console.error("Error while registering user:", error);
    res.status(400).json({ error: error.detail[0].message });
  }
};
