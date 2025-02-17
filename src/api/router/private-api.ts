import express from "express";
import upload from "../../lib/multer";
import CategoryController from "../controller/category-controller";
import { authenticate, checkRole } from "../../middleware/auth";
import { StoreController } from "../controller/store-controller";
import {ProductController} from "../controller/product-controller";
import { SellerController } from "../controller/seller-controller";

export const privateApi = express.Router();

// API ADMIN
/**
 * @swagger
 * tags:
 *   - name: Admin
 * security:
 *   - bearerAuth: []
 *
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 * 
 * /api/v1/admin/category/create:
 *   post:
 *     tags:
 *       - Admin   
 *     description: Create Category
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: string
 *               slug:
 *                 type: string
 *                 example: string
 *               image:
 *                 type: string
 *                 format: binary
 *                 example: file
 *     responses:
 *       200:
 *         description: OK
 */
privateApi.post("/admin/category/create", authenticate, checkRole('ADMIN'), upload.single('image'), CategoryController.create);
/**
 * @swagger
 * tags:
 *   - name: Admin
 * 
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 * 
 * security:
 *   - bearerAuth: []
 *
 * /api/v1/admin/category:
 *   get:
 *     tags:
 *       - Admin   
 *     description: Get all Categories
 *     parameters:
 *       - name: name
 *         in: header
 *         required: false
 *         schema:
 *           type: string
 *           description: "name"
 *       - name: status
 *         in: header
 *         required: false
 *         schema:
 *           type: string
 *           description: "active"
 *       - name: page
 *         in: header
 *         required: false
 *         schema:
 *           type: number
 *           example: 1
 *       - name: size
 *         in: header
 *         required: false
 *         schema:
 *           type: number
 *           example: 10
 *     responses:
 *       200:
 *         description: OK
 */

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
privateApi.get("/product/:slug/get-single", authenticate, checkRole('SELLER'), ProductController.getSingleProduct)

privateApi.get("/verify/store/:storeSlug", authenticate, checkRole('SELLER'), StoreController.checkStore)
privateApi.get("/store/list/:id", authenticate, checkRole('SELLER'), StoreController.getStoreByUser);
privateApi.get("/get-all/category", authenticate, checkRole('SELLER'), SellerController.getAllCategory);
