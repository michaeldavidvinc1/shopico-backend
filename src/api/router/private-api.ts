import express from "express";
import upload from "../../lib/multer";
import CategoryController from "../controller/category-controller";
import { authenticate, checkRole } from "../../middleware/auth";
import { StoreController } from "../controller/store-controller";

export const privateApi = express.Router();

privateApi.post("/admin/category/create", authenticate, checkRole('ADMIN'), upload.single('image'), CategoryController.create);
privateApi.get("/admin/category", authenticate, checkRole('ADMIN') ,CategoryController.getAll);
privateApi.get("/admin/category/:slug", authenticate, checkRole('ADMIN'),  CategoryController.getSingle);
privateApi.put("/admin/category/:slug", authenticate, checkRole('ADMIN'), upload.single('image'), CategoryController.update);
privateApi.get("/admin/category/:slug/softDelete", authenticate, checkRole('ADMIN'),  CategoryController.softDelete);
privateApi.get("/admin/category/:slug/forceDelete", authenticate, checkRole('ADMIN'),  CategoryController.forceDelete);
privateApi.get("/admin/category/:slug/activated", authenticate, checkRole('ADMIN'),  CategoryController.activatedCategory);

privateApi.post("/store/create", authenticate, StoreController.create);