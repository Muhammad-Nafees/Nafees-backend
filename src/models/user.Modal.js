import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";

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
    selectYourService: {
      type: [String],
      required: true,
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


const UserModal = model("UserModal", UserSchema);

export { UserModal };