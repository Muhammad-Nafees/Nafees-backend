import { UserModal } from "../models/user.Modal.js";
import { parseBody, tokenGenerate } from "../utils/index.js";
import  bcrypt,{ compare, hash } from "bcrypt";
import { registerSchema } from "../validations/authValidation.js";
import { STATUS_CODES } from "../constants.js";

export const registerUser = async (req, res, next) => {
  try {
    const body = parseBody(req.body);
    await registerSchema.validateAsync(body);
    const {phoneNumber,password,} = body;

    // console.log("🚀 ~ registerUser ~ body:", body);

    // Create a new instance of UserModal with user data

    const phoneNumberRegister = await UserModal.findOne({phoneNumber});
    const passwordLoginRegister = await UserModal.findOne({password});

    if (phoneNumberRegister && passwordLoginRegister) {
      return res.send({
        message: "Both password and phoneNumber already exist",
      });
    } else if (phoneNumberRegister) {
      return res.send({ message: "phone Number already Exist" });
    } else if (passwordLoginRegister) {
      return res.send({ message: "password Already Exist" });
    }

    // console.log("🚀 ~ registerUser ~ hashedPassword:", hashedPassword);

    const accessToken = tokenGenerate(body?._id);
    const user = new UserModal(body);
    const savedUser = await user.save();

    // Send a success response
    res.status(STATUS_CODES.CREATED).json({
      message: "User registered successfully",
      user: savedUser,
      token: accessToken,
    });
  } catch (error) {
    // Handle any errors
    if (error.isJoi) {
      console.error(
        "Validation error while registering user:",
        error.details[0].message
      );
      return res.status(400).json({ error: error.details[0].message });
    };

    // Handle any other errors
    console.error("Error while registering user:", error);
    next(error);
  }
};

// phone number password ------->  Login

export const login = async (req, res, next) => {
  const body = parseBody(req.body);
  const { phoneNumber, password } = body;

  try {
    
    if (!phoneNumber || !password) {
      return res.status(STATUS_CODES.BAD_REQUEST).json({ message: "Phone number and password are required" });
    }
    
    const user = await UserModal.findOne({ phoneNumber });
    // const passwordDB = await UserModal.findOne({ password });
    if (!user) {
      return res.status(STATUS_CODES.FORBIDDEN).json({ message: "Invalid Credentials" });
    };

    // Compare provided password with stored hashed password
    
     const isMatch = await compare(password, user.password);
    console.log("🚀 ~ login ~ provided password:", password);
    console.log("🚀 ~ login ~ stored hashed password:", user.password);
// console.log("🚀 ~ login ~ isMatch:", isMatch);
    
    if (!isMatch) {
      return res
      .status(STATUS_CODES.FORBIDDEN)
      .json({ message: "Invalid Credentials" });
    }
    
    const token = tokenGenerate(user._id);

    return res.status(STATUS_CODES.SUCCESS).json({
      message: "Login SuccessFull",
      user: user,
      token: token,
    });
  } catch (error) {
    console.log("🚀 ~ login ~ error:", error);
  }
};

// const passwordLogin = await UserModal.findOne({ password });
// console.log("🚀 ~ login ~ password:", passwordLogin);

export const deletaAll = async (req, res) => {
  try {
    await UserModal.deleteMany({});
    res.status(200).json({ message: "All users deleted successfully" });
  } catch (error) {
    console.error("Error deleting users:", error);
    res.status(500).json({ error: "Failed to delete users" });
  }
};
