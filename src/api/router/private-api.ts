import express from "express";
import upload from "../../lib/multer";
import CategoryController from "../controller/category-controller";

export const privateApi = express.Router();

privateApi.post("/admin/category/create", upload.single('image'), CategoryController.create);