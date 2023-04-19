"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const itemCategory_model_1 = __importDefault(require("../models/itemCategory.model"));
class ItemCategoryController {
    static async getCategories(req, res) {
        try {
            const categories = await itemCategory_model_1.default.getAllCategories();
            res.json(categories).status(200);
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ message: 'SERVER ERROR!' });
        }
    }
    static async addCategory(req, res) {
        try {
            const category = req.body;
            const newCategory = await itemCategory_model_1.default.addCategory(category);
            res.json(newCategory).status(200);
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ message: 'SERVER ERROR!' });
        }
    }
    static async editCategory(req, res) {
        try {
            const categoryToEdit = req.body;
            const updatedCategory = await itemCategory_model_1.default.editCategory(categoryToEdit);
            res.json(updatedCategory).status(200);
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ message: 'SERVER ERROR!' });
        }
    }
    static async deleteCategory(req, res) {
        try {
            const categoryId = Number(req.params.category_id);
            const deletedCategory = await itemCategory_model_1.default.deleteCategory(categoryId);
            res.json(deletedCategory).status(200);
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ message: 'SERVER ERROR!' });
        }
    }
}
module.exports = ItemCategoryController;
