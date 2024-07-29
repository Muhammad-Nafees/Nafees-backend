import { Schema, model } from "mongoose";
import jwt from "jsonwebtoken";

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      lowercase: true,
    },
    address: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      //   select: false,
    },
    confirmPassword: {
      type: String,
      required: true,
      //   select: false,
    },
    token: {
      type: String,
      select: false,
    },
   
  },
  { timestamps: true, versionKey: false }
);

// UserSchema.pre("save", async function (next) {
//   if (!this.isModified("password")) return next();
//   this.password = await bcrypt.hash(this.password, 10);
//   this.confirmPassword = await bcrypt.hash(this.password, 10);
//   console.log("🚀 ~ password:", this.password);
//   next();
// });

// UserSchema.methods.isPasswordCorrect = async function (password) {
//   try {
//     const bcryptPwd = await bcrypt.compare(password, this.password);
//     return bcryptPwd;
//   } catch (error) {
//     next(error)
//   }
// };

export const findUser = (query) => {
  console.log("🚀 ~ findUser ~ query:", query);
  return UserModal.findOne({ ...query });
};

UserSchema.methods.generateAccessToken = async function (userId) {
  const token = jwt.sign({ user_id: userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.EXPIRYJWT,
  });
  console.log("🚀 ~ token:", token);
  console.log("🚀 ~ userId generateAccessToken:", userId);
  return token;
};

UserSchema.methods.generateRefreshToken = async function (password) {};

const UserModal = model("UserModal", UserSchema);

export { UserModal };
