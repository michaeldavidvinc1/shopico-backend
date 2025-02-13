import { NextFunction, Request, Response } from "express";
import cloudinary from "../../lib/cloudinary";
import fs from "fs";
import {
  CreateProduct,
  SearchProduct,
  UpdateProduct,
} from "../../model/request/product-request";
import { ProductService } from "../service/product-service";

export class ProductController {
  static async create(req: Request, res: Response, next: NextFunction) {
    try {

      const request = {
        storeId: req.body.storeId,
        categoryId: req.body.categoryId,
        name: req.body.name,
        slug: req.body.slug,
        description: req.body.description || "",
        stock: Number(req.body.stock),
        price: Number(req.body.price),
        weight: req.body.weight ? Number(req.body.weight) : null,
        image: [] as string[],
      } as CreateProduct;

      if (req.files && Array.isArray(req.files)) {
        for (const file of req.files) {
          const filePath = file.path;
          const result = await cloudinary.uploader.upload(filePath, {
            folder: "Product",
          });
          fs.unlinkSync(filePath);

          request.image.push(result.url);
        }
      }


      const result = await ProductService.create(request);
      res.status(200).json({
        success: true,
        message: "Create product successfully",
        data: result,
      });
    } catch (error: unknown) {
      if (error instanceof Error) {
        next(error);
      } else {
        next(new Error("An unknown error occurred"));
      }
    }
  }

  static async getAllByStore(req: Request, res: Response, next: NextFunction) {
    try {
      const slugStore = req.params.slugStore;
      const request: SearchProduct = {
        name: (req.query.name as string) || "",
        status: (req.query.name as string) || "",
        page: req.query.page ? Number(req.query.page) : 1,
        size: req.query.size ? Number(req.query.size) : 10,
      };
      const result = await ProductService.getAllByStore(request, slugStore);
      res.status(200).json({
        success: true,
        message: "Get All product successfully",
        data: result,
      });
    } catch (error: unknown) {
      if (error instanceof Error) {
        next(error);
      } else {
        next(new Error("An unknown error occurred"));
      }
    }
  }

  static async update(req: Request, res: Response, next: NextFunction) {
    try {
      const productSlug = req.params.slug;
      const request = {
        storeId: req.body.storeId,
        categoryId: req.body.categoryId,
        name: req.body.name,
        slug: req.body.slug,
        description: req.body.description || "",
        stock: Number(req.body.stock),
        price: Number(req.body.price),
        weight: req.body.weight ? Number(req.body.weight) : null,
        image: [] as string[],
      };
      const imageUrls: string[] = [];
      if (req.files && Array.isArray(req.files)) {
        for (const file of req.files) {
          const filePath = file.path;
          const result = await cloudinary.uploader.upload(filePath, {
            folder: "Product",
          });
          fs.unlinkSync(filePath);

          imageUrls.push(result.url);
        }
      }
      const currentImages = req.body.current_images
      ? JSON.parse(req.body.current_images)
      : [];
      request.image = currentImages.concat(imageUrls);
      console.log(request)
      const result = await ProductService.update(request, productSlug);
      res.status(200).json({
        success: true,
        message: "Update product successfully",
        data: result,
      });
    } catch (error: unknown) {
      if (error instanceof Error) {
        next(error);
      } else {
        next(new Error("An unknown error occurred"));
      }
    }
  }

  static async forceDelete(req: Request, res: Response, next: NextFunction) {
    try {
      const productSlug = req.params.slug;
      const result = await ProductService.forceDelete(productSlug);
      res.status(200).json({
        success: true,
        message: "Delete permanent product successfully",
        data: result,
      });
    } catch (error: unknown) {
      if (error instanceof Error) {
        next(error);
      } else {
        next(new Error("An unknown error occurred"));
      }
    }
  }

  static async activationProduct(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const productSlug = req.params.slug;
      const result = await ProductService.activatedProduct(productSlug);
      res.status(200).json({
        success: true,
        message: "Activation product successfully",
        data: result,
      });
    } catch (error: unknown) {
      if (error instanceof Error) {
        next(error);
      } else {
        next(new Error("An unknown error occurred"));
      }
    }
  }

  static async getSingleProduct(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const productSlug = req.params.slug;
      const result = await ProductService.getSingleProduct(productSlug);
      res.status(200).json({
        success: true,
        message: "Get single product successfully",
        data: result,
      });
    } catch (error: unknown) {
      if (error instanceof Error) {
        next(error);
      } else {
        next(new Error("An unknown error occurred"));
      }
    }
  }
}
