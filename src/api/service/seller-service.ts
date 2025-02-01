import { prismaClient } from "../../db/prisma";
import { AllCategory, toAllCategory } from "../../model/response/seller-response";

export class SellerService {
    static async getAllCategory(): Promise<AllCategory[]>{
        const category = await prismaClient.category.findMany({
            where: {
                status: true
            }
        })

        return category.map(toAllCategory);
    }
}