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
    static async getDataHomePage(){
        const category = await prismaClient.category.findMany({
            where: {
                status: Status.ACTIVE
            }
        })

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
            allProduct
        }
    }
}