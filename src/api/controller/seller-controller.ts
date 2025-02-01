import { NextFunction, Request, Response } from "express";
import { SellerService } from "../service/seller-service";

export class SellerController {
  static async getAllCategory(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await SellerService.getAllCategory();
      res.status(200).json({
        success: true,
        message: "Get all category successfully",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }
}
