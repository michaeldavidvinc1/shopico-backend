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
}
