import { Schema, model } from "mongoose";

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: Number,
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
      select: false,
    },
    confirmPassword: {
      type: String,
      required: true,
      select: false,
    },
    token: {
      type: String,
      select: false,
    },
  },
  { timestamps: true, versionKey: false }
);

const UserModal = model("UserModal", UserSchema);

UserSchema.pre("save", function (next) {
  console.log("pre save fired!");
  return next();
});

export { UserModal };