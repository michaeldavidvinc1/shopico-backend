import { prismaClient } from "../../db/prisma";
import { BadRequest, NotFound } from "../../errors";
import { CreateCategory } from "../../model/request/category-request";
import { ApiCategory } from "../../model/response/category-response";
import { Validation } from "../../model/response/validation";
import { CategoryValidation } from "../../validation/category-validation";
import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';

export class CategoryService{
    static async checkCategoryMustExists(categorySlug: string): Promise<ApiCategory>{
        const category = await prismaClient.category.findFirst({
            where: {
                slug: categorySlug
            }
        });

        if(!category){
            throw new NotFound("Category not found");
        }

        return category;
    }

    static async create(req: CreateCategory): Promise<ApiCategory>{
        const createCategory = Validation.validate(CategoryValidation.CREATE, req);

        const duplicateData = await prismaClient.category.findFirst({
            where: {
                name: createCategory.name
            }
        });

        if(duplicateData){
            throw new BadRequest("Category name already exists");
        }

        const category = await prismaClient.category.create({
            data: createCategory
        })

        return category;
    }
}