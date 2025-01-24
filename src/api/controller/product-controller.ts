import {NextFunction, Request, Response} from "express";
import {CreateCategory} from "../../model/request/category-request";
import cloudinary from "../../lib/cloudinary";
import fs from "fs";
import {CreateProduct} from "../../model/request/product-request";
import {ProductService} from "../service/product-service";

export class ProductController {
    static async create(req: Request, res: Response, next: NextFunction){
        try {
            const request: CreateProduct = req.body as CreateProduct;
            // const imageUrls: string[] = [];
            // if (req.files && Array.isArray(req.files)) {
            //     for (const file of req.files) {
            //         const filePath = file.path;
            //         const result = await cloudinary.uploader.upload(filePath, {
            //             folder: "Product",
            //         });
            //         fs.unlinkSync(filePath);
            //
            //         imageUrls.push(result.url);
            //     }
            // }
            // request.image = imageUrls;
            const result = await ProductService.create(request);
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