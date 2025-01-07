import jwt from "jsonwebtoken";
import config from "../config";
import { Response } from "express";

interface CreateJWTParams {
  payload: any;
  res: Response;
}

const createJWT = ({ payload, res }: CreateJWTParams) => {
  const token = jwt.sign(payload, config.jwtSecret as string, {
    expiresIn: config.jwtExpiration,
  });

  //! Set JWT as an HTTP-Only Cookie
  res.cookie("jwt", token, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    maxAge: 1 * 24 * 60 * 60 * 1000,
  });
  return token;
};

const isTokenValid = (token: string) =>
  jwt.verify(token, config.jwtSecret as string);

export { createJWT, isTokenValid };
