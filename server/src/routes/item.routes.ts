import express, { Router } from "express";
import ItemController from "../controllers/item.controller";
import middleware from "../middlewares/auth";

const router: Router = express.Router();

// TODO: Add middleware to the routes
router.get("/items", ItemController.getItems);
router.get("/items/get/item/by/item/id/:id", ItemController.getItemById);
router.get("/items/get/the/latest/item", ItemController.getLatestItem);
router.get("/items/:id", ItemController.getItemsByUserId);
router.post("/items/add/new/item" ,ItemController.addItem);
router.put("/items/edit/item", ItemController.editItem);
router.delete("/items/delete/:item_id" , ItemController.deleteItem);

export default router;
