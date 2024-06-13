import { UserModal } from "../models/user.Modal.js";
import { parseBody, tokenGenerate } from "../utils/index.js";
import bcrypt from "bcrypt";
import { registerSchema } from "../validations/authValidation.js";
import { STATUS_CODES } from "../constants.js";

// Hashing password
const SALT_ROUNDS = 10;

export const registerUser = async (req, res, next) => {
  try {
    const body = parseBody(req.body);
    await registerSchema.validateAsync(body);
    const { phoneNumber, password } = body;

    const phoneNumberRegister = await UserModal.findOne({ phoneNumber });
    const passwordRegister = await UserModal.findOne({ password });

    if (phoneNumberRegister && passwordRegister) {
      return res.send({
        message: "Both phone number and password already exist",
      });
    } else if (phoneNumberRegister) {
      return res.send({ message: "Phone number already exists" });
    } else if (passwordRegister) {
      return res.send({ message: "Password already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
    body.confirmPassword = hashedPassword;
    const user = new UserModal({ ...body, password: hashedPassword });
    const savedUser = await user.save();

    const accessToken = tokenGenerate(savedUser._id);

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

    const user = await UserModal.findOne({ phoneNumber });
    if (!user) {
      return res
        .status(STATUS_CODES.FORBIDDEN)
        .json({ message: "Invalid Credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    console.log("🚀 ~ login ~ provided password:", password);
    console.log("🚀 ~ login ~ stored hashed password:", user.password);

    if (!isMatch) {
      return res
        .status(STATUS_CODES.FORBIDDEN)
        .json({ message: "Invalid Credentials" });
    }

    const token = tokenGenerate(user._id);

    return res.status(STATUS_CODES.SUCCESS).json({
      message: "Login Successful",
      user: user,
      token: token,
    });
  } catch (error) {
    console.log("🚀 ~ login ~ error:", error);
    next(error);
  }
};

export const deletaAll = async (req, res) => {
  try {
    await UserModal.deleteMany({});
    res.status(200).json({ message: "All users deleted successfully" });
  } catch (error) {
    console.error("Error deleting users:", error);
    res.status(500).json({ error: "Failed to delete users" });
  }
};
