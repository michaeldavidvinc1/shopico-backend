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
    } catch (error: unknown) {
      if (error instanceof Error) {
        next(error);
      } else {
        next(new Error("An unknown error occurred"));
      }
    }
  }
  
  static async getDataHomePage(req: Request, res: Response, next: NextFunction){
    try {
      const userId = req.params.userId || "";
      const result = await SellerService.getDataHomePage(userId);
      res.status(200).json({
        success: true,
        message: "Get all data successfully",
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
