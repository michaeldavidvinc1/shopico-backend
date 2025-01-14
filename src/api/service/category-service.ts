import { prismaClient } from "../../db/prisma";
import { BadRequest, NotFound } from "../../errors";
import {
  CreateCategory,
  SearchCategory,
} from "../../model/request/category-request";
import {
  ApiCategory,
  toCategoryResponse,
} from "../../model/response/category-response";
import { Validation } from "../../validation/validation";
import { CategoryValidation } from "../../validation/category-validation";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import { Pageable } from "../../model/response/page";

export class CategoryService {
  static async checkCategoryMustExists(
    categorySlug: string
  ): Promise<ApiCategory> {
    const category = await prismaClient.category.findFirst({
      where: {
        slug: categorySlug,
      },
    });

    if (!category) {
      throw new NotFound("Category not found");
    }

    return category;
  }

  static async create(req: CreateCategory): Promise<ApiCategory> {
    const createCategory = Validation.validate(CategoryValidation.CREATE, req);

    const duplicateData = await prismaClient.category.findFirst({
      where: {
        name: createCategory.name,
      },
    });

    if (duplicateData) {
      throw new BadRequest("Category name already exists");
    }

    const category = await prismaClient.category.create({
      data: createCategory,
    });

    return category;
  }

  static async getAll(req: SearchCategory): Promise<Pageable<ApiCategory>> {
    const searchCategory = Validation.validate(CategoryValidation.SEARCH, req);

    const skip = (searchCategory.page - 1) * searchCategory.size;

    const filters: { [key: string]: any } = {};

    if (searchCategory.name) {
      filters.name = {
        contains: searchCategory.name,
      };
    }
    if (searchCategory.status) {
      filters.status = {
        contains: searchCategory.status,
      };
    }
    const category = await prismaClient.category.findMany({
      where: {
        ...filters,
      },
      take: searchCategory.size,
      skip: skip,
    });

    const total = await prismaClient.category.count();

    return {
      data: category.map((category) => toCategoryResponse(category)),
      paging: {
        current_page: searchCategory.page,
        total_page: Math.ceil(total / searchCategory.size),
        size: searchCategory.size,
      },
    };
  }
}
