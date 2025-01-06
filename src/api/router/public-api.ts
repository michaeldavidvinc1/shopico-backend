import express from "express";
import {AuthController} from "../controller/auth-controller";

export const publicApi = express.Router();

// Auth API
publicApi.post("/auth/register", AuthController.register);