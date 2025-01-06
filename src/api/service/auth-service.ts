import { prismaClient } from "../../db/prisma";
import { BadRequest } from "../../errors";
import { RegisterRequest } from "../../model/request/auth-request";
import {AuthResponse, toAuthResponse} from "../../model/response/auth-response";
import { Validation } from "../../model/response/validation";
import { AuthValidation } from "../../validation/auth-validation";
import {Role} from "@prisma/client";

export class AuthService {
  static async register(req: RegisterRequest): Promise<AuthResponse> {
    const registerRequest = Validation.validate(AuthValidation.REGISTER, req);

    let user = await prismaClient.user.findFirst({
      where: {
        email: registerRequest.email,
      },
    });

    if(user){
        throw new BadRequest("Email already exists!");
    }

    const result = await prismaClient.user.create({
      data: {
        name: registerRequest.name,
        email: registerRequest.email,
        password: registerRequest.password,
      },
    });
    
    return toAuthResponse(result);

  }
}
