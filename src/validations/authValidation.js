import Joi from "joi";

export const registerSchema = Joi.object({
  username: Joi.string().required(),
  phoneNumber: Joi.number().required(),
  email: Joi.string().email().required(),
  address: Joi.string().required(),
  password: Joi.string().min(6).required(),
  confirmPassword: Joi.string().valid(Joi.ref("password"))
    .required()
    .error(() => {
      return {
        message: "Passwords do not match",
      };
    }),
});