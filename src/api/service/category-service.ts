import { prismaClient } from "../../db/prisma";
import { BadRequest, NotFound } from "../../errors";
import {
  CreateCategory,
  SearchCategory,
  UpdateCategory,
} from "../../model/request/category-request";
import {
  ApiCategory,
  toCategoryResponse,
} from "../../model/response/category-response";
import { Validation } from "../../validation/validation";
import { CategoryValidation } from "../../validation/category-validation";
import { Pageable } from "../../model/response/page";
import cloudinary from "../../lib/cloudinary";
import { ExtractPublicId } from "../../helpers/extractPubliId";
import { Status } from "@prisma/client";

export class CategoryService {
  static async checkCategoryMustExists(categorySlug: string): Promise<ApiCategory> {
    const category = await prismaClient.category.findFirst({
      where: {
        slug: categorySlug,
      },
      include: {
        image: true,
      },
    });

    if (!category) {
      throw new NotFound("Category not found");
    }

    return toCategoryResponse(category);
  }

  static async create(req: CreateCategory): Promise<ApiCategory> {
    const { image, ...createCategory } = Validation.validate(
      CategoryValidation.CREATE,
      req
    );

    const duplicateData = await prismaClient.category.findFirst({
      where: {
        slug: createCategory.slug,
      },
    });

    if (duplicateData) {
      throw new BadRequest("Category name already exists");
    }

    const category = await prismaClient.category.create({
      data: createCategory,
    });

    if (image) {
      await prismaClient.image.create({
        data: {
          url: image,
          type: "category",
          categoryId: category.id,
        },
      });
    }

    return await this.checkCategoryMustExists(category.slug);
  }

  static async getAll(req: SearchCategory): Promise<Pageable<ApiCategory>> {
    const searchCategory = Validation.validate(CategoryValidation.SEARCH, req);

    const skip = (searchCategory.page - 1) * searchCategory.size;

    const filters: Record<string, unknown> = {};

    if (searchCategory.name) {
      filters.name = { contains: searchCategory.name };
    }
    if (searchCategory.status) {
      filters.status = {contains: searchCategory.status};
    }

    const categories = await prismaClient.category.findMany({
      where: { ...filters },
      include: {
        image: true,
      },
      take: searchCategory.size,
      skip: skip,
    });

    const total = await prismaClient.category.count({
      where: { ...filters },
    });

    return {
      data: categories.map((category) => toCategoryResponse(category)),
      paging: {
        current_page: searchCategory.page,
        total_page: Math.ceil(total / searchCategory.size),
        size: searchCategory.size,
      },
    };
  }

  static async getSingle(slug: string): Promise<ApiCategory> {
    const category = await prismaClient.category.findFirst({
      where: {
        slug: slug,
      },
      include: {
        image: true,
      },
    });

    if (!category) {
      throw new NotFound("Category not found");
    }

    return toCategoryResponse(category);
  }

  static async update(req: UpdateCategory,categorySlug: string): Promise<ApiCategory> {
    const { image, ...updateCategory } = Validation.validate(
      CategoryValidation.UPDATE,
      req
    );

    const existingData = await this.checkCategoryMustExists(categorySlug);

    const existingImage = await prismaClient.image.findFirst({
      where: {
        categoryId: existingData.id,
      },
    });
    if (image) {
      if (existingImage) {
        // Delete previous image in cloudinary
        const publicId = ExtractPublicId(existingImage.url);
        await cloudinary.uploader.destroy(publicId);
        // Update new image url in model Image
        const data = await prismaClient.image.update({
          where: {
            categoryId: existingData.id,
          },
          data: {
            url: image,
          },
        });
      }
    }

    const category = await prismaClient.category.update({
      where: {
        slug: categorySlug,
      },
      data: {
        name: updateCategory.name,
        slug: updateCategory.slug,
        status: updateCategory.status as Status,
      },
    });

    return await this.checkCategoryMustExists(category.slug);
  }

  static async softDelete(slug: string): Promise<ApiCategory> {
    await this.checkCategoryMustExists(slug);

    const category = await prismaClient.category.update({
      where: {
        slug: slug,
      },
      data: {
        status: Status.INACTIVE,
      },
    });

    return await this.checkCategoryMustExists(category.slug);
  }

  static async forceDelete(slug: string): Promise<ApiCategory> {
    await this.checkCategoryMustExists(slug);

    const category = await prismaClient.category.delete({
      where: {
        slug: slug,
      },
    });

    return await this.checkCategoryMustExists(category.slug);
  }

  static async activatedCategory(slug: string): Promise<ApiCategory> {
    await this.checkCategoryMustExists(slug);

    const category = await prismaClient.category.update({
      where: {
        slug: slug,
      },
      data: {
        status: Status.ACTIVE,
      },
    });

    return await this.checkCategoryMustExists(category.slug);
  }
}
