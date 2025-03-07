import {
  CreateProduct,
  SearchProduct,
  UpdateProduct,
} from "../../model/request/product-request";
import {
  ApiProduct,
  toProductResponse,
} from "../../model/response/product-response";
import { prismaClient } from "../../db/prisma";
import { BadRequest } from "../../errors";
import { Validation } from "../../validation/validation";
import { ProductValidation } from "../../validation/product-validation";
import { Pageable } from "../../model/response/page";
import { ExtractPublicId } from "../../helpers/extractPubliId";
import cloudinary from "../../lib/cloudinary";
import { StoreService } from "./store-service";
import { CategoryService } from "./category-service";
import { Status } from "@prisma/client";

export class ProductService {
  static async checkProduct(productSlug: string): Promise<ApiProduct> {
    const product = await prismaClient.product.findFirst({
      where: {
        slug: productSlug,
      },
      include: {
        image: true,
        category: true,
      },
    });

    if (!product) {
      throw new BadRequest("Product not found");
    }

    return toProductResponse(product);
  }

  static async create(req: CreateProduct): Promise<ApiProduct> {
    const createProduct = Validation.validate(ProductValidation.CREATE, req);

    const duplicateData = await prismaClient.product.findFirst({
      where: {
        slug: createProduct.slug,
      },
    });

    if (duplicateData) {
      throw new BadRequest("Product name already exists");
    }

    await StoreService.checkStoreExists(createProduct.storeId);

    await CategoryService.checkCategoryMustExists(createProduct.categoryId);

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
          productId: product.id,
        },
      });
    }

    return await this.checkProduct(product.slug);
  }

  static async getAllByStore(
    req: SearchProduct,
    slugStore: string
  ): Promise<Pageable<ApiProduct>> {
    const searchProduct = Validation.validate(ProductValidation.SEARCH, req);

    const skip = (searchProduct.page - 1) * searchProduct.size;

    const filters: Record<string, unknown> = {};

    if (searchProduct.name) {
      filters.name = { contains: searchProduct.name };
    }

    if (searchProduct.status) {
      filters.status = { equals: searchProduct.status };
    }

    if (slugStore) {
      filters.storeId = slugStore;
    }
    const product = await prismaClient.product.findMany({
      where: { ...filters },
      include: {
        category: true,
        image: true,
      },
      take: searchProduct.size,
      skip: skip,
    });

    const total = await prismaClient.product.count({
      where: { ...filters },
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

  static async getSingleProduct(productSlug: string): Promise<ApiProduct> {
    const product = await this.checkProduct(productSlug);
    return product;
  }

  static async update(
    req: UpdateProduct,
    productSlug: string
  ): Promise<ApiProduct> {
    const updateProduct = Validation.validate(ProductValidation.UPDATE, req);
    const existingData = await this.checkProduct(productSlug);

    // Hapus gambar berdasarkan updateProduct.delete_image
    if (
      Array.isArray(updateProduct.delete_image) &&
      updateProduct.delete_image.length > 0
    ) {
      const deletePromises = updateProduct.delete_image.map(async (url) => {
        const publicId = ExtractPublicId(url);
        await cloudinary.uploader.destroy(publicId);
        await prismaClient.image.deleteMany({
          where: { productId: existingData.id, url: url },
        });
      });
      await Promise.all(deletePromises);
    }

    // Tambahkan gambar baru berdasarkan updateProduct.image
    if (Array.isArray(updateProduct.image) && updateProduct.image.length > 0) {
      const createPromises = updateProduct.image.map(async (url) => {
        // Pastikan gambar belum ada di database
        const existingImage = await prismaClient.image.findFirst({
          where: { productId: existingData.id, url: url },
        });

        if (!existingImage) {
          return prismaClient.image.create({
            data: { type: "product", productId: existingData.id, url: url },
          });
        }
      });

      await Promise.all(createPromises);
    }

    // Update product details
    const updatedProduct = await prismaClient.product.update({
      where: { slug: productSlug },
      data: {
        storeId: updateProduct.storeId,
        categoryId: updateProduct.categoryId,
        name: updateProduct.name,
        slug: updateProduct.slug,
        description: updateProduct.description,
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
        slug: slug,
      },
    });

    await prismaClient.image.deleteMany({
      where: {
        productId: product.id,
      },
    });

    return product;
  }

  static async detailProduct({ slug, userId }: { slug: string; userId: string }) {
     const product = await prismaClient.product.findUnique({
      where: { slug },
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
          select: { name: true },
        },
        Reviews: {
          select: { rating: true },
        },
        Wishlist: userId
          ? {
              where: { userId },
              select: { id: true },
            }
          : false,
      },
    });

    return product;
  }
  

  static async getProductByCategory(categoryId: string): Promise<ApiProduct[]> {
    const product = await prismaClient.product.findMany({
      where: { 
        categoryId: categoryId
       },
      include: {
        category: true,
        image: true,
      },
      take: 10,
    });

    return product.map((product) => toProductResponse(product))
  }
}
