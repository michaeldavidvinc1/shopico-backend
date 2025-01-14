import { NextFunction, Request, Response } from "express";
import { CategoryService } from "../service/category-service";
import {
  CreateCategory,
  SearchCategory,
} from "../../model/request/category-request";
import cloudinary from "../../lib/cloudinary";
import fs from "fs";

class CategoryController {
  static async create(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const request: CreateCategory = req.body as CreateCategory;
      if (req.file) {
        const filePath = req.file.path;
        const result = await cloudinary.uploader.upload(filePath, {
          folder: "Categories",
        });
        console.log(result);
        fs.unlinkSync(filePath);
        request.image = result.url;
      }
      const result = await CategoryService.create(request);
      res.status(200).json({
        success: true,
        message: "Create category successfully",
        data: result,
      });
    } catch (e) {
      next(e);
    }
  }
  static async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const request: SearchCategory = {
        name: (req.query.name as string) || "",
        status: req.query.status ? req.query.status === "true" : false,
        page: req.query.page ? Number(req.query.page) : 1,
        size: req.query.size ? Number(req.query.size) : 10,
      };
      const result = await CategoryService.getAll(request);
      res.status(200).json({
        success: true,
        message: "Get All category successfully",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getSingle(req: Request, res: Response, next: NextFunction){
    try {
      const categorySlug = req.params.slug;
      const result = await CategoryService.getSingle(categorySlug);
      res.status(200).json({
        success: true,
        message: "Get single category successfully",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }
}

export default CategoryController;
