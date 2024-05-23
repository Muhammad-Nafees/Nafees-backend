import jwt from "jsonwebtoken";

export const parseBody = (userBody) => {
  let obj;
  if (typeof userBody == "object") obj = userBody;
  else obj = JSON.parse(userBody);
  return obj;
};

export const tokenGenerate = (userId) => {
  const token = jwt.sign({ user_id: userId }, "JWT_SECRET", { expiresIn: "1h" });
  return token;
};
