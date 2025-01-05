import { prismaClient } from "../../db/prisma";
import { BadRequest } from "../../errors";
import { RegisterRequest } from "../../model/request/auth-request";
import { AuthResponse } from "../../model/response/auth-response";
import { Validation } from "../../model/response/validation";
import { AuthValidation } from "../../validation/auth-validation";

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

    

  }
}
