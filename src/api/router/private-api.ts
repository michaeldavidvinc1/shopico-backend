import express from "express";
import upload from "../../lib/multer";
import CategoryController from "../controller/category-controller";
import { authenticate, checkRole } from "../../middleware/auth";
import { StoreController } from "../controller/store-controller";
import {ProductController} from "../controller/product-controller";
import { SellerController } from "../controller/seller-controller";

export const privateApi = express.Router();

// API ADMIN
privateApi.post("/admin/category/create", authenticate, checkRole('ADMIN'), upload.single('image'), CategoryController.create);
privateApi.get("/admin/category", authenticate, checkRole('ADMIN') ,CategoryController.getAll);
privateApi.get("/admin/category/:slug", authenticate, checkRole('ADMIN'),  CategoryController.getSingle);
privateApi.put("/admin/category/:slug", authenticate, checkRole('ADMIN'), upload.single('image'), CategoryController.update);
privateApi.get("/admin/category/:slug/softDelete", authenticate, checkRole('ADMIN'),  CategoryController.softDelete);
privateApi.get("/admin/category/:slug/forceDelete", authenticate, checkRole('ADMIN'),  CategoryController.forceDelete);
privateApi.get("/admin/category/:slug/activated", authenticate, checkRole('ADMIN'),  CategoryController.activatedCategory);

privateApi.get("/admin/product/active/:slug", authenticate, checkRole('ADMIN'), ProductController.activationProduct)

// API CUSTOMER AND SELLER
privateApi.post("/store/create", authenticate, StoreController.create);

// API SELLER
privateApi.post("/product/create", authenticate, checkRole('SELLER'), upload.array('image'), ProductController.create);
privateApi.get("/product/:slugStore", authenticate, checkRole('SELLER'), ProductController.getAllByStore);
privateApi.put("/product/:slug", authenticate, checkRole('SELLER'), upload.array('image'), ProductController.update);
privateApi.delete("/product/:slug", authenticate, checkRole('SELLER'), ProductController.forceDelete);

privateApi.get("/verify/store/:storeSlug", authenticate, checkRole('SELLER'), StoreController.checkStore)
privateApi.get("/store/list/:id", authenticate, checkRole('SELLER'), StoreController.getStoreByUser);
privateApi.get("/get-all/category", authenticate, checkRole('SELLER'), SellerController.getAllCategory);
