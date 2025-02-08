import {CreateProduct, SearchProduct, UpdateProduct} from "../../model/request/product-request";
import {ApiProduct, toProductResponse} from "../../model/response/product-response";
import {prismaClient} from "../../db/prisma";
import {BadRequest} from "../../errors";
import {Validation} from "../../validation/validation";
import {ProductValidation} from "../../validation/product-validation";
import {Pageable} from "../../model/response/page";
import {ExtractPublicId} from "../../helpers/extractPubliId";
import cloudinary from "../../lib/cloudinary";
import { StoreService } from "./store-service";
import { CategoryService } from "./category-service";
import { Status } from "@prisma/client";

export class ProductService {
    static async checkProduct(productSlug: string): Promise<ApiProduct> {
        const product = await prismaClient.product.findFirst({
            where: {
                slug: productSlug
            },
            include: {
                image: true,
                category: true
            }
        })

        if (!product) {
            throw new BadRequest("Product not found");
        }

        return toProductResponse(product);
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

        await StoreService.checkStoreExists(createProduct.storeId);

        await CategoryService.checkCategoryMustExists(createProduct.categoryId)

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

        for (const image of createProduct.image) {
            await prismaClient.image.create({
                data: {
                    url: image,
                    type: "product",
                    productId: product.id
                }
            })
        }

        return await this.checkProduct(product.slug);
    }

    static async getAllByStore(req: SearchProduct, slugStore: string): Promise<Pageable<ApiProduct>> {
        const searchProduct = Validation.validate(ProductValidation.SEARCH, req);

        const skip = (searchProduct.page - 1) * searchProduct.size;

        const filters: Record<string, unknown> = {};

        if (searchProduct.name) {
            filters.name = {contains: searchProduct.name};
    }

        if (searchProduct.status) {
            filters.status = {contains: searchProduct.status};
        }

        if (slugStore) {
            filters.storeId = slugStore;
        }
        const product = await prismaClient.product.findMany({
            where: {...filters},
            include: {
                category: true,
                image: true,
            },
            take: searchProduct.size,
            skip: skip,
        });


        const total = await prismaClient.product.count({
            where: {...filters},
        });

        return {
            data: product.map((product) => toProductResponse(product)),
            paging: {
                current_page: searchProduct.page,
                total_page: Math.ceil(total / searchProduct.size),
                size: searchProduct.size,
            },
        };
    }

    static async getSingleProduct(productSlug: string ): Promise<ApiProduct> {
        const product = await this.checkProduct(productSlug);
        return product;
    }

    static async update(req: UpdateProduct, productSlug: string): Promise<ApiProduct> {
        const updateProduct = Validation.validate(ProductValidation.UPDATE, req);
        const existingData = await this.checkProduct(productSlug);
        console.log(updateProduct)

        const existingImages = await prismaClient.image.findMany({
            where: { productId: existingData.id }
        });
        const dbImageUrls = existingImages.map((img: {url: string}) => img.url);

        const updateProductImages = Array.isArray(updateProduct.image) ? updateProduct.image : [];

        const imagesToDelete = dbImageUrls.filter(url => !updateProductImages.includes(url));

        const deleteImagePromises = imagesToDelete.map(async (url) => {
            const publicId = ExtractPublicId(url);
            await cloudinary.uploader.destroy(publicId);
            await prismaClient.image.deleteMany({
                where: { productId: existingData.id, url: url },
            });
        });

        // Create or update images in a single pass
        const newImages = updateProductImages.filter(url => !dbImageUrls.includes(url));
        const createImagePromises = newImages.map(url => prismaClient.image.create({
            data: { type: "product", productId: existingData.id, url: url },
        }));

        // Execute image deletion and creation in parallel
        await Promise.all([...deleteImagePromises, ...createImagePromises]);

        // Update product details
        const updatedProduct = await prismaClient.product.update({
            where: { slug: productSlug },
            data: {
                storeId: updateProduct.storeId,
                categoryId: updateProduct.categoryId,
                name: updateProduct.name,
                slug: updateProduct.slug,
                description: updateProduct.description, // fixed field
                stock: updateProduct.stock,
                price: updateProduct.price,
                weight: updateProduct.weight,
            },
        });

        return this.checkProduct(updatedProduct.slug);
    }

    static async forceDelete(slug: string) {

        await this.checkProduct(slug);

        const product = await prismaClient.product.delete({
            where: {
                slug: slug
            }
        })

        await prismaClient.image.deleteMany({
            where: {
                productId: product.id
            }
        })


        return product;
    }

    static async activatedProduct(slug: string): Promise<ApiProduct> {

        await this.checkProduct(slug);

        const product = await prismaClient.product.update({
            where: {
                slug: slug
            },
            data: {
                status: Status.ACTIVE
            }
        })

        return await this.checkProduct(product.slug);
    }
}