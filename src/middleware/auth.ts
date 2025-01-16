import { NextFunction, Request, Response } from "express";
import Unauthorized from "../errors/unauthorized";
import jwt from "jsonwebtoken";
import config from "../config";
import { prismaClient } from "../db/prisma";
import { Role } from "@prisma/client";
import { UnauthenticatedError, UnauthorizedError } from "../errors";

interface JwtPayload {
    userId: string;
    email: string;
    iat: number;
    exp: number;
  }

const authenticate = async(req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    const token = authHeader?.split(' ')[1];

    if(!token){
        return next(new Unauthorized("Access token missing!"));
    }

    try {
        const decoded = jwt.verify(token, config.jwtSecret as string) as JwtPayload;
        const user = await prismaClient.user.findFirst({
            where: {
                id: decoded.userId
            }
        })
        if(!user){
            return next(new Unauthorized("Not authorized!"));
        }
        next();
    } catch (error) {
        next(error)
    }
}

const checkRole = (role: string) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        const authHeader = req.headers.authorization;
        const token = authHeader?.split(" ")[1];

        if (!token) {
            return next(new UnauthenticatedError("Access token missing!"));
        }

        try {
            const decoded = jwt.verify(token, config.jwtSecret as string) as JwtPayload;
            const user = await prismaClient.user.findFirst({
                where: {
                    id: decoded.userId,
                },
            });
            if (!user) {
                return next(new UnauthenticatedError("Not authorized!"));
            }

            if (user.role !== role) {
                return next(new UnauthorizedError("Unauthorized role!"));
            }

            next();
        } catch (error) {
            next(error);
        }
    };
};

export {authenticate, checkRole}