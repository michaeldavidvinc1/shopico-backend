import express from "express";
import {AuthController} from "../controller/auth-controller";
import { SellerController } from "../controller/seller-controller";

export const publicApi = express.Router();

// Auth API
publicApi.post("/auth/register", AuthController.register);
publicApi.post("/admin/auth/login", AuthController.loginAdmin);
publicApi.post("/auth/login", AuthController.login);

publicApi.get("/get-data/home", SellerController.getDataHomePage)