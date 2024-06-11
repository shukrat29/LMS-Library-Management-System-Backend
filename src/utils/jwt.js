import JWT from "jsonwebtoken";
import { insertToken } from "../models/session/SessionSchema.js";
import { updateUser } from "../models/user/UserModel.js";

// create acess jwt
export const singAccessJWT = (payload) => {
  const token = JWT.sign(payload, process.env.ACCESS_JWT_SECRET, {
    expiresIn: "15m",
  });
  insertToken({ token });
  return token;
};

// verify acess jwt
export const verifyAccessJWT = (token) => {
  try {
    return JWT.verify(token, process.env.ACCESS_JWT_SECRET);
  } catch (error) {
    return error.message === "jwt expired" ? "jwt expired" : "Invalid Token";
  }
};

// create refresh jwt
export const singRefresJWT = ({ email }) => {
  const refreshJWT = JWT.sign({ email }, process.env.REFRESH_JWT_SECRET, {
    expiresIn: "30d",
  });
  updateUser({ email }, { refreshJWT });
  return refreshJWT;
};
// verify refresh jwt

export const verifyRefreshJWT = (token) => {
  try {
    return JWT.verify(token, process.env.REFRESH_JWT_SECRET);
  } catch (error) {
    return "Invalid Token";
  }
};
