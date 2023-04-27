import express, { Router } from "express";
import ItemCategoryController from "../controllers/itemCategory.controller"
import middleware from "../middlewares/auth";

const router: Router = express.Router();

// TODO: Add middleware to the routes

router.get("/categories", ItemCategoryController.getCategories);
router.post("/categories/add/new/category" , ItemCategoryController.addCategory);
router.put("/categories/edit/category", ItemCategoryController.editCategory);
router.delete("/categories/delete/:category_id" , ItemCategoryController.deleteCategory);

export default router;
