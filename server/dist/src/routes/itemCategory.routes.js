"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const itemCategory_controller_1 = __importDefault(require("../controllers/itemCategory.controller"));
const router = express_1.default.Router();
// TODO: Add middleware to the routes
router.get("/categories", itemCategory_controller_1.default.getCategories);
router.post("/categories/add/new/category", itemCategory_controller_1.default.addCategory);
router.put("/categories/edit/category", itemCategory_controller_1.default.editCategory);
router.delete("/categories/delete/:category_id", itemCategory_controller_1.default.deleteCategory);
exports.default = router;
