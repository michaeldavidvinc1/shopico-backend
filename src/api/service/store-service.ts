import { Role } from "@prisma/client";
import { prismaClient } from "../../db/prisma";
import { BadRequest } from "../../errors";
import { CreateStore } from "../../model/request/store-request";
import { ApiStore, toStoreResponse } from "../../model/response/store-response";
import { StoreValidation } from "../../validation/store-validation";
import { Validation } from "../../validation/validation";
import { AuthService } from "./auth-service";

export class StoreService {
    static async create(req: CreateStore): Promise<ApiStore>{
         const createStore = Validation.validate(StoreValidation.CREATE, req);

         await AuthService.checkUserExists(createStore.userId);

         await prismaClient.user.update({
            where: {
                id: createStore.userId
            },
            data: {
                role: Role.SELLER
            }
         })

         const duplicateData = await prismaClient.store.findFirst({
            where: {
              slug: createStore.slug,
            },
          });
      
          if (duplicateData) {
              throw new BadRequest("Store name already exists");
          }
          const store = await prismaClient.store.create({
            data: createStore,
          });
          return toStoreResponse(store);
    }
}