import { prismaClient } from "../../db/prisma";
import { BadRequest } from "../../errors";
import {
  LoginAdminRequest,
  RegisterRequest,
} from "../../model/request/auth-request";
import {
  AuthResponse,
  toAuthResponse,
} from "../../model/response/auth-response";
import { Validation } from "../../model/response/validation";
import { AuthValidation } from "../../validation/auth-validation";
import { Role } from "@prisma/client";
import bcrypt from "bcrypt";

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

  static async loginAdmin(req: LoginAdminRequest): Promise<AuthResponse> {
    const loginAdminRequest = Validation.validate(AuthValidation.LOGIN, req);

    let user = await prismaClient.user.findFirst({
      where: {
        email: loginAdminRequest.email,
      },
    });

    if (!user) {
      throw new BadRequest("Invalid Credentials!");
    }

    if (user.role === Role.ADMIN) {
      throw new BadRequest("Unauthorized!");
    }

    const isPasswordValid = await bcrypt.compare(
      loginAdminRequest.password,
      user.password
    );

    if (!isPasswordValid) {
      throw new BadRequest("Username or password is wrong");
    }
  }
}
