import { Response } from "express";
import { prismaClient } from "../../db/prisma";
import { BadRequest } from "../../errors";
import {
  LoginRequest,
  RegisterRequest,
} from "../../model/request/auth-request";
import {
  AuthResponse,
  toAuthResponse,
} from "../../model/response/auth-response";
import { Validation } from "../../validation/validation";
import { createTokenUser } from "../../utils/createUserToken";
import { createJWT } from "../../utils/jwt";
import { AuthValidation } from "../../validation/auth-validation";
import { Role } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "../../config";

export class AuthService {
  static async register(req: RegisterRequest): Promise<AuthResponse> {
    const registerRequest = Validation.validate(AuthValidation.REGISTER, req);

    let user = await prismaClient.user.findFirst({
      where: {
        email: registerRequest.email,
      },
    });

    if (user) {
      throw new BadRequest("Email already exists!");
    }

    const hashPassword = await bcrypt.hashSync(registerRequest.password, 10);

    const result = await prismaClient.user.create({
      data: {
        email : registerRequest.email,
        name: registerRequest.name,
        password: hashPassword
      },
    });

    return toAuthResponse(result);
  }

  static async loginAdmin(req: LoginRequest, res: Response): Promise<AuthResponse> {
    const loginAdminRequest = Validation.validate(AuthValidation.LOGIN, req);

    let user = await prismaClient.user.findFirst({
      where: {
        email: loginAdminRequest.email,
      },
    });

    if (!user) {
      throw new BadRequest("Invalid Credentials!");
    }

    if (user.role !== Role.ADMIN) {
      throw new BadRequest("Unauthorized!");
    }

    const isPasswordValid = await bcrypt.compare(
      loginAdminRequest.password,
      user.password
    );

    if (!isPasswordValid) {
      throw new BadRequest("Username or password is wrong");
    }

    const token = createJWT({ payload: createTokenUser(user), res });

    const response = toAuthResponse(user);
    return {
      ...response,
      token: token.token,
      exp: token.exp,
      id: user.id
    };
  }

  static async login(req: LoginRequest, res: Response): Promise<AuthResponse> {
    const loginRequest = Validation.validate(AuthValidation.LOGIN, req);

    let user = await prismaClient.user.findFirst({
      where: {
        email: loginRequest.email,
      },
    });

    if (!user) {
      throw new BadRequest("Invalid Credentials!");
    }

    const isPasswordValid = await bcrypt.compare(
      loginRequest.password,
      user.password
    );

    if (!isPasswordValid) {
      throw new BadRequest("Username or password is wrong");
    }

    const token = createJWT({ payload: createTokenUser(user), res });

    const response = toAuthResponse(user);
    return {
      ...response,
      token: token.token,
      exp: token.exp,
      id: user.id
    };
  }

  static async checkUserExists(id: string): Promise<AuthResponse>{
    const user = await prismaClient.user.findFirst({
      where: {
        id: id
      }
    });

    if(!user){
      throw new BadRequest('User not found');
    }

    return user;
  }

  static async verifyToken(token: string) {
      const decoded = jwt.verify(token, config.jwtSecret as string);
      return decoded;
  }
}
