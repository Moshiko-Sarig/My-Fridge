const ItemCategoryModel = require('../models/ItemCategoryModel');


class ItemCategoryController {
    static async getCategories(req, res) {
        try {
            const categories = await ItemCategoryController.getCategories();
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
            const newCategory = await ItemCategoryController.addCategory(category);
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
            const updatedCategory = await ItemCategoryController.editCategory(categoryToEdit);
            res.json(updatedCategory).status(200);
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ message: 'SERVER ERROR!' });
        }
    }

    static async deleteCategory(req, res) {
        try {
            const categoryId = req.params.category_id;
            const deletedCategory = await ItemCategoryController.deleteCategory(categoryId);
            res.json(deletedCategory).status(200);
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ message: 'SERVER ERROR!' });
        }
    }
}


module.exports = ItemCategoryController;