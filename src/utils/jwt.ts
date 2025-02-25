import jwt from "jsonwebtoken";
import config from "../config";
import { Response } from "express";

interface CreateJWTParams {
  payload: Record<string, unknown>;
  res: Response;
}

const createJWT = ({ payload, res }: CreateJWTParams) => {
  const token = jwt.sign(payload, config.jwtSecret as string, {
    expiresIn: config.jwtExpiration,
  });

  const decoded = jwt.decode(token) as { exp: number };

  //! Set JWT as an HTTP-Only Cookie
  res.cookie("jwt", token, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    maxAge: 1 * 24 * 60 * 60 * 1000,
  });
  return { token, exp: decoded.exp };
};

const isTokenValid = (token: string) =>
  jwt.verify(token, config.jwtSecret as string);

export { createJWT, isTokenValid };
