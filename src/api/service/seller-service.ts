import { Status } from "@prisma/client";
import { prismaClient } from "../../db/prisma";
import { AllCategory, toAllCategory } from "../../model/response/seller-response";

export class SellerService {
    static async getAllCategory(): Promise<AllCategory[]>{
        const category = await prismaClient.category.findMany({
            where: {
                status: Status.ACTIVE
            }
        })

        return category.map(toAllCategory);
    }
    static async getDataHomePage(userId: string){
        const category = await prismaClient.category.findMany({
            where: {
                status: Status.ACTIVE
            },
            include: {
                image: true
            }
        })

        const products = await prismaClient.product.findMany({
            select: {
              id: true,
              name: true,
              slug: true,
              description: true,
              price: true,
              stock: true,
              weight: true,
              status: true,
              createdAt: true,
              updatedAt: true,
              category: {
                select: {
                  name: true, 
                },
              },
              Reviews: {
                select: {
                  rating: true, 
                },
              },
              Wishlist: {
                where: userId ? { userId: userId } : undefined, 
                select: {
                  id: true, 
                },
              },
            },
          });

        const allProduct = await prismaClient.product.findMany({
            where: {
                status: Status.ACTIVE
            },
            include: {
                category: true,
                image: true
            }
        })

        return {
            category,
            allProduct,
            products
        }
    }
}