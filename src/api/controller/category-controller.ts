import { NextFunction, Request, Response } from "express";
import { CategoryService } from "../service/category-service";
import { CreateCategory } from "../../model/request/category-request";
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
        console.log(result)
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
}

export default CategoryController;
