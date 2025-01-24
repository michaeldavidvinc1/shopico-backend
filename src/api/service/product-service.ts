import {CreateProduct} from "../../model/request/product-request";
import {ApiProduct} from "../../model/response/product-response";
import {prismaClient} from "../../db/prisma";
import {BadRequest} from "../../errors";
import {Validation} from "../../validation/validation";
import {CategoryValidation} from "../../validation/category-validation";
import {ProductValidation} from "../../validation/product-validation";

export class ProductService {
    static async checkProduct(productSlug: string): Promise<ApiProduct>{
        const product = await prismaClient.product.findFirst({
            where: {
                slug: productSlug
            }
        })

        if(!product) {
            throw new BadRequest("Product not found");
        }

        return product;
    }
    static async create(req: CreateProduct): Promise<ApiProduct> {
        const createProduct = Validation.validate(ProductValidation.CREATE, req);
        const duplicateData = await prismaClient.product.findFirst({
            where: {
                slug: createProduct.slug
            }
        });

        if (duplicateData) {
            throw new BadRequest("Product name already exists");
        }

        const product = await prismaClient.product.create({
            data: {
                storeId: createProduct.storeId,
                categoryId: createProduct.categoryId,
                name: createProduct.name,
                slug: createProduct.slug,
                description: createProduct.categoryId,
                stock: createProduct.stock,
                price: createProduct.price,
                weight: createProduct.weight,
            },
        });

        for(const image of createProduct.image){
            await prismaClient.image.create({
                data: {
                    url: image,
                    type: "product",
                    productId: product.id
                }
            })
        }

        return product;
    }
}