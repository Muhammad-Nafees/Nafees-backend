import { UserModal } from "../models/user.Modal.js";

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
    console.log("USER", user);
    // Save the user to the database
    const savedUser = await user.save();

    // Send a success response
    res
      .status(201)
      .json({ message: "User registered successfully", user: savedUser });
  } catch (error) {
    // Handle any errors
    console.error("Error while registering user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
