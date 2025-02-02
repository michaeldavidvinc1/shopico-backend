import { Role } from "@prisma/client";
import { prismaClient } from "../../db/prisma";
import { BadRequest, NotFound } from "../../errors";
import { CreateStore } from "../../model/request/store-request";
import { ApiStore, toStoreResponse } from "../../model/response/store-response";
import { StoreValidation } from "../../validation/store-validation";
import { Validation } from "../../validation/validation";
import { AuthService } from "./auth-service";
import { Request } from "express";
import jwt from "jsonwebtoken"
import config from "../../config";

interface JwtPayload {
    userId: string;
    email: string;
    iat: number;
    exp: number;
}

export class StoreService {

    static async checkStoreExists(storeSlug: string): Promise<ApiStore>{
        const store = await prismaClient.store.findFirst({
            where: {
                slug: storeSlug
            }
        })

        if(!store){
            throw new NotFound("Store not found!")
        }

        return toStoreResponse(store);
    }

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

    static async checkStoreUser(storeSlug: string, req: Request): Promise<ApiStore>{
        const authHeader = req.headers.authorization;
        const token = authHeader?.split(" ")[1];

        if(!token){
            throw new BadRequest("Token missing!");
        }
        const decoded = jwt.verify(token, config.jwtSecret as string) as JwtPayload;

        const user = await prismaClient.user.findFirst({
            where: {
                id: decoded.userId,
            },
        });

        if(!user){
            throw new BadRequest('Not authorized')
        }

        const store = await prismaClient.store.findFirst({
            where: {
                slug: storeSlug,
                AND: {
                    userId: user.id,
                }
            }
        })

        if(!store){
            throw new BadRequest('Not authorized to this store')
        }

        return toStoreResponse(store);
    }

    static async getStoreByUser(userId: string): Promise<ApiStore[]>{
        const checkUser = await AuthService.checkUserExists(userId);

        const store = await prismaClient.store.findMany({
            where: {
                userId: userId,
            }
        });

        return store.map((item) => toStoreResponse(item));
    }
}