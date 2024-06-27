import { UserModal } from "../../models/user.Modal.js";
import { parseBody, tokenGenerate } from "../../utils/index.js";
import { registerSchema } from "../../validations/authValidation.js";
import { STATUS_CODES } from "../../constants.js";
import { findUser } from "../../models/user.Modal.js";

export const registerUser = async (req, res, next) => {
  try {
    const body = parseBody(req.body);
    await registerSchema.validateAsync(body);
    const { phoneNumber, password } = body;

    // Check if phone number exists
    const users = await findUser({ phoneNumber: phoneNumber });
    const existingPassword = await findUser({ password: password });
    if (users && existingPassword) {
      return res
        .status(400)
        .json({ message: "Both phone number and password already exists" });
    } else if (users) {
      return res.status(400).json({ message: "Phone Number Already exists" });
    } else if (existingPassword) {
      return res.status(400).json({ message: "Password Already exists" });
    }

    const accessToken = tokenGenerate(savedUser._id);
    // Create new user
    const user = new UserModal(body);
    const savedUser = await user.save();


    res.status(STATUS_CODES.CREATED).json({
      message: "User registered successfully",
      user: savedUser,
      token: accessToken,
    });
  } catch (error) {
    if (error.isJoi) {
      console.error(
        "Validation error while registering user:",
        error.details[0].message
      );
      return res.status(400).json({ error: error.details[0].message });
    }

    console.error("Error while registering user:", error);
    next(error);
  }
};

export const login = async (req, res, next) => {
  const body = parseBody(req.body);
  const { phoneNumber, password } = body;

  try {
    if (!phoneNumber || !password) {
      return res
        .status(STATUS_CODES.BAD_REQUEST)
        .json({ message: "Phone number and password are required" });
    }

    const user = await findUser({ phoneNumber });
    const isMatch = await findUser({ password });

    if (!user) {
      return res
        .status(STATUS_CODES.FORBIDDEN)
        .json({ message: "Invalid Credentials" });
    }

    if (!isMatch) {
      return res
        .status(STATUS_CODES.FORBIDDEN)
        .json({ message: "Invalid Credentials" });
    }

    const accessToken = await user.generateAccessToken(user._id);

    return res.status(STATUS_CODES.SUCCESS).json({
      message: "Login Successful",
      user: user,
      token: accessToken,
    });
  } catch (error) {
    console.log("🚀 ~ login ~ error:", error);
    next(error);
  }
};

export const forget = async(req,res,next) =>{
  const body = parseBody(req.body);
  const { phoneNumber, password } = body;
}



export const deletaAll = async (req, res) => {
  try {
    await UserModal.deleteMany({});
    res.status(200).json({ message: "All users deleted successfully" });
  } catch (error) {
    console.error("Error deleting users:", error);
    res.status(500).json({ error: "Failed to delete users" });
  }
};
