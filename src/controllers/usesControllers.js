import { UserModal } from "../models/user.Modal.js";
import { parseBody, tokenGenerate } from "../utils/index.js";
import { compare, hash } from "bcrypt";
import { registerSchema } from "../validations/authValidation.js";
import { STATUS_CODES } from "../constants.js";

export const registerUser = async (req, res, next) => {
  try {
    const body = parseBody(req.body);
    await registerSchema.validateAsync(body);
    console.log("🚀 ~ registerUser ~ body:", body);
    // Create a new instance of UserModal with user data
    const user = new UserModal(body);
    const accessToken = tokenGenerate(user?._id);

    // const hashedPassword = await hash(body.password, 10);
    // user.password = hashedPassword;
    // console.log("🚀 ~ registerUser ~ hashedPassword:", hashedPassword);

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
    }

    // Handle any other errors
    console.error("Error while registering user:", error);
    next(error);
  }
};

// phone number password ------->  Login

export const login = async (req, res, next) => {
  const body = parseBody(req.body);
  const { phoneNumber, password } = body;
  console.log("🚀 ~ login ~ body:", body);

  try {
    const phoneNumberlogin = await UserModal.findOne({ phoneNumber });
    const passwordLogin = await UserModal.findOne({ password });
    console.log("🚀 ~ login ~ phoneNumber:", phoneNumberlogin);

    if (!phoneNumberlogin || !passwordLogin)
      return res
        .status(STATUS_CODES.FORBIDDEN)
        .json({ message: "Invalid Credientials" });

    // const isMatch = await compare(password, passwordLogin.password);
    const token = tokenGenerate(phoneNumberlogin._id);
    // if (!isMatch) {
    //   return res
    //     .status(STATUS_CODES.FORBIDDEN)
    //     .json({ message: "Invalid Credentials matching" });
    // }

    return res.status(STATUS_CODES.SUCCESS).json({
      message: "Login SuccessFull",
      user: passwordLogin,
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
