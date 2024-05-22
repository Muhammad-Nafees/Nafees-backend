import { UserModal } from "../models/user.Modal.js";
import { registerSchema } from "../validations/authValidation.js";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res, next) => {
    
  const {
    username,
    phoneNumber,
    email,
    selectYourService,
    address,
    password,
    confirmPassword,
  } = req.body;

  try {
    await registerSchema.validateAsync(req.body);
    // Create a new instance of UserModal with user data
    const user = new UserModal({
      username: username,
      phoneNumber: phoneNumber,
      email: email,
      selectYourService: selectYourService,
      address: address,
      password: password,
      confirmPassword: confirmPassword,
    });

    const jwt_data = jwt.sign({ user_id: user._id }, "JWT_SECRET", {
      expiresIn: "1h",
    });

    // Save the user to the database
    const savedUser = await user.save();

    // Send a success response
    res.status(201).json({
      message: "User registered successfully",
      user: savedUser,
      token: jwt_data,
    });
  } catch (error) {
    // Handle any errors
    console.error("Error while registering user:", error);
    res.status(400).json({ error: error.detail[0].message });
  }
};