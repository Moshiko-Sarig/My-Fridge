import { Request, Response } from 'express';
import itemCategoryModel from '../models/itemCategory.model';

class ItemCategoryController {
  static async getCategories(req: Request, res: Response) {
    try {
      const categories = await itemCategoryModel.getAllCategories();
      res.json(categories).status(200);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'SERVER ERROR!' });
    }
  }
  static async addCategory(req: Request, res: Response) {
    try {
      const category = req.body;
      const newCategory = await itemCategoryModel.addCategory(category);
      res.json(newCategory).status(200);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'SERVER ERROR!' });
    }
  }

  static async editCategory(req: Request, res: Response) {
    try {
      const categoryToEdit = req.body;
      const updatedCategory = await itemCategoryModel.editCategory(categoryToEdit);
      res.json(updatedCategory).status(200);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'SERVER ERROR!' });
    }
  }

  static async deleteCategory(req: Request, res: Response) {
    try {
      const categoryId = Number(req.params.category_id);
      const deletedCategory = await itemCategoryModel.deleteCategory(categoryId);
      res.json(deletedCategory).status(200);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'SERVER ERROR!' });
    }
  }
}

export = ItemCategoryController;
