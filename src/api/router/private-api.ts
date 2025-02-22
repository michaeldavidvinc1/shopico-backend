import express from "express";
import upload from "../../lib/multer";
import CategoryController from "../controller/category-controller";
import { authenticate, checkRole } from "../../middleware/auth";
import { StoreController } from "../controller/store-controller";
import {ProductController} from "../controller/product-controller";
import { SellerController } from "../controller/seller-controller";
import {AuthController} from "../controller/auth-controller";

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
 * /api/v1/admin/category/{slug}:
 *   get:
 *     tags:
 *       - Admin   
 *     description: Get single Categories
 *     parameters:
 *       - name: slug
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 */
privateApi.get("/admin/category/:slug", authenticate, checkRole('ADMIN'),  CategoryController.getSingle);
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
 * /api/v1/admin/category/{slug}:
 *   put:
 *     tags:
 *       - Admin   
 *     description: Update Category
 *     parameters:
 *       - name: slug
 *         in: path
 *         required: true
 *         schema:
 *           type: string
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
privateApi.put("/admin/category/:slug", authenticate, checkRole('ADMIN'), upload.single('image'), CategoryController.update);
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
 * /api/v1/admin/category/{slug}/softDelete:
 *   get:
 *     tags:
 *       - Admin
 *     description: Soft delete Categories
 *     parameters:
 *       - name: slug
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 */
privateApi.get("/admin/category/:slug/softDelete", authenticate, checkRole('ADMIN'),  CategoryController.softDelete);
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
 * /api/v1/admin/category/{slug}/forceDelete:
 *   get:
 *     tags:
 *       - Admin
 *     description: Force delete Categories
 *     parameters:
 *       - name: slug
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 */
privateApi.get("/admin/category/:slug/forceDelete", authenticate, checkRole('ADMIN'),  CategoryController.forceDelete);
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
 * /api/v1/admin/category/{slug}/activated:
 *   get:
 *     tags:
 *       - Admin
 *     description: Activated Categories
 *     parameters:
 *       - name: slug
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 */
privateApi.get("/admin/category/:slug/activated", authenticate, checkRole('ADMIN'),  CategoryController.activatedCategory);

// API CUSTOMER AND SELLER
/**
 * @swagger
 * tags:
 *   - name: Seller & Customer
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
 * /api/v1/store/create:
 *   post:
 *     tags:
 *       - Seller & Customer
 *     description: Create Store
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *                 example: string
 *               name:
 *                 type: string
 *                 example: string
 *               slug:
 *                 type: string
 *                 example: string
 *     responses:
 *       200:
 *         description: OK
 */
privateApi.post("/store/create", authenticate, StoreController.create);
/**
 * @swagger
 * tags:
 *   - name: Seller & Customer
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
 * /api/v1/verify/token/{token}:
 *   get:
 *     tags:
 *       - Seller & Customer
 *     description: Verify token auth
 *     parameters:
 *       - name: token
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 */
privateApi.get("/verify/token/:token", AuthController.verifyToken)

// API SELLER
/**
 * @swagger
 * tags:
 *   - name: Seller
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
 * /api/v1/product/create:
 *   post:
 *     tags:
 *       - Seller
 *     description: Create Product
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               storeId:
 *                 type: string
 *                 required: true
 *                 example: string
 *               categoryId:
 *                 type: string
 *                 required: true
 *                 example: string
 *               name:
 *                 type: string
 *                 required: true
 *                 example: string
 *               slug:
 *                 type: string
 *                 required: true
 *                 example: string
 *               image:
 *                 type: array
 *                 required: true
 *                 items:
 *                   type: string
 *                   format: binary
 *                   example: file
 *               description:
 *                 type: string
 *                 example: string
 *               stock:
 *                 type: number
 *                 required: true
 *                 example: number
 *               price:
 *                 type: number
 *                 required: true
 *                 example: number
 *               weight:
 *                 type: number
 *                 example: number
 *     responses:
 *       200:
 *         description: OK
 */
privateApi.post("/product/create", authenticate, checkRole('SELLER'), upload.array('image'), ProductController.create);
/**
 * @swagger
 * tags:
 *   - name: Seller
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
 * /api/v1/product/{slugStore}:
 *   get:
 *     tags:
 *       - Seller
 *     description: Get product by store
 *     parameters:
 *       - name: slugStore
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 */
privateApi.get("/product/:slugStore", authenticate, checkRole('SELLER'), ProductController.getAllByStore);
/**
 * @swagger
 * tags:
 *   - name: Seller
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
 * /api/v1/product/{slug}:
 *   put:
 *     tags:
 *       - Seller
 *     description: Update Product
 *     parameters:
 *       - name: slug
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               storeId:
 *                 type: string
 *                 required: true
 *                 example: string
 *               categoryId:
 *                 type: string
 *                 required: true
 *                 example: string
 *               name:
 *                 type: string
 *                 required: true
 *                 example: string
 *               slug:
 *                 type: string
 *                 required: true
 *                 example: string
 *               image:
 *                 type: array
 *                 required: true
 *                 items:
 *                   type: string
 *                   format: binary
 *                   example: file
 *               description:
 *                 type: string
 *                 example: string
 *               stock:
 *                 type: number
 *                 required: true
 *                 example: number
 *               price:
 *                 type: number
 *                 required: true
 *                 example: number
 *               weight:
 *                 type: number
 *                 example: number
 *     responses:
 *       200:
 *         description: OK
 */
privateApi.put("/product/:slug", authenticate, checkRole('SELLER'), upload.array('image'), ProductController.update);
/**
 * @swagger
 * tags:
 *   - name: Seller
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
 * /api/v1/product/{slug}:
 *   delete:
 *     tags:
 *       - Seller
 *     description: Delete product
 *     parameters:
 *       - name: slug
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 */
privateApi.delete("/product/:slug", authenticate, checkRole('SELLER'), ProductController.forceDelete);
/**
 * @swagger
 * tags:
 *   - name: Seller
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
 * /api/v1/product/{slug}/get-single:
 *   get:
 *     tags:
 *       - Seller
 *     description: Get single product
 *     parameters:
 *       - name: slug
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 */
privateApi.get("/product/:slug/get-single", authenticate, checkRole('SELLER'), ProductController.getSingleProduct)

/**
 * @swagger
 * tags:
 *   - name: Seller
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
 * /api/v1/verify/store/{storeSlug}:
 *   get:
 *     tags:
 *       - Seller
 *     description: Verify store by user login
 *     parameters:
 *       - name: storeSlug
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 */
privateApi.get("/verify/store/:storeSlug", authenticate, checkRole('SELLER'), StoreController.checkStore)
/**
 * @swagger
 * tags:
 *   - name: Seller
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
 * /api/v1/store/list/{id}:
 *   get:
 *     tags:
 *       - Seller
 *     description: Get store by user
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 */
privateApi.get("/store/list/:id", authenticate, checkRole('SELLER'), StoreController.getStoreByUser);
/**
 * @swagger
 * tags:
 *   - name: Seller
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
 * /api/v1/get-all/category:
 *   get:
 *     tags:
 *       - Seller
 *     description: Get all category
 *     responses:
 *       200:
 *         description: OK
 */
privateApi.get("/get-all/category", authenticate, checkRole('SELLER'), SellerController.getAllCategory);

