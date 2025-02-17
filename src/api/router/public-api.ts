import express from "express";
import { AuthController } from "../controller/auth-controller";
import { SellerController } from "../controller/seller-controller";

export const publicApi = express.Router();

/**
 * @swagger
 * tags:
 *   - name: Authentication
 *
 * /api/v1/auth/register:
 *   post:
 *     tags:
 *       - Authentication   
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: string
 *               email:
 *                 type: string
 *                 format: email
 *                 example: string
 *               password:
 *                 type: string
 *                 format: password
 *                 example: string
 *     responses:
 *       200:
 *         description: OK
 */
publicApi.post("/auth/register", AuthController.register);
/**
 * @swagger
 * tags:
 *   - name: Authentication
 *
 * /api/v1/admin/auth/login:
 *   post:
 *     tags:
 *       - Authentication   
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: string
 *               password:
 *                 type: string
 *                 format: password
 *                 example: string
 *     responses:
 *       200:
 *         description: OK
 */
publicApi.post("/admin/auth/login", AuthController.loginAdmin);
/**
 * @swagger
 * tags:
 *   - name: Authentication
 *
 * /api/v1/auth/login:
 *   post:
 *     tags:
 *       - Authentication   
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: string
 *               password:
 *                 type: string
 *                 format: password
 *                 example: string
 *     responses:
 *       200:
 *         description: OK
 */
publicApi.post("/auth/login", AuthController.login);

/**
 * @swagger
 * tags:
 *   - name: Seller
 *
 * /api/v1/get-data/home:
 *   get:
 *     tags:
 *       - Seller   
 *     responses:
 *       200:
 *         description: OK
 */
publicApi.get("/get-data/home", SellerController.getDataHomePage);
