import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const generateAccessToken = (payload) => {
  return jwt.sign(
    payload,
    process.env.ACCESS_TOKEN_SECRET || "Anyrandom32digitstring",
    {
      expiresIn: "15m",
    },
  );
};

export const generateRefreshToken = (payload) => {
  return jwt.sign(
    payload,
    process.env.REFRESH_TOKEN_SECRET || "Anyrandom32digitstring",
    {
      expiresIn: "7d",
    },
  );
};

export const verifyAccessToken = (token) => {
  return jwt.verify(
    token,
    process.env.ACCESS_TOKEN_SECRET || "Anyrandom32digitstring",
  );
};

export const verifyRefreshToken = (token) => {
  return jwt.verify(
    token,
    process.env.REFRESH_TOKEN_SECRET || "Anyrandom32digitstring",
  );
};
