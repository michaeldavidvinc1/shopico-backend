import { NextFunction, Request, Response } from "express";
import { CreateStore } from "../../model/request/store-request";
import { StoreService } from "../service/store-service";

export class StoreController {
  static async create(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const request: CreateStore = req.body as CreateStore;
      const result = await StoreService.create(request);
      res.status(200).json({
        success: true,
        message: "Create store successfully",
        data: result,
      });
    } catch (e) {
      next(e);
    }
  }

  static async checkStore(req: Request, res: Response, next: NextFunction) {
    try {
      const storeSlug = req.params.storeSlug;
      const result = await StoreService.checkStoreUser(storeSlug, req);
      res.status(200).json({
        success: true,
        message: "Verify user successfully",
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

  static async getStoreByUser(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.params.id;
      const result = await StoreService.getStoreByUser(userId);
      res.status(200).json({
        success: true,
        message: "Get list store successfully",
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
