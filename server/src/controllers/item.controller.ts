import { Request, Response, response } from 'express';
import ItemModel from '../models/item.model';

class ItemController {
    static async getItems(req: Request, res: Response) {
        try {
            const allItems = await ItemModel.getAllItems();
            res.json(allItems).status(200);
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ message: 'SERVER ERROR!' });
        }
    }
    static async getItemById(req: Request, res: Response) {
        try {
            const itemId = req.params.id;
            const singleItem = await ItemModel.getItemsByUserId(itemId);
            res.json(singleItem).status(200);
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ message: 'SERVER ERROR!' });
        }
    }
    static async getLatestItem(req: Request, res: Response) {
        try {
            const singleItem = await ItemModel.getLatestItem();
            res.json(singleItem).status(200);
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ message: 'SERVER ERROR!' });
        }
    }
    static async getItemsByUserId(req: Request, res: Response) {
        try {
            const userId = req.params.id;
            const userItems = await ItemModel.getItemsByUserId(userId);
            res.json(userItems).status(200);
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ message: 'SERVER ERROR!' });
        }
    }
    static async addItem(req: Request, res: Response) {
        try {
            const itemToAdd = req.body;
            const response = await ItemModel.addItem(itemToAdd);
            const newItem = await ItemModel.getItemById(response.data.insertId);
            res.json(newItem).status(200);
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ message: 'SERVER ERROR!' });
        }
    }

    static async editItem(req: Request, res: Response) {
        try {
            const itemToEdit = req.body;
            const editedItem = await ItemModel.editItem(itemToEdit);
            res.json(editedItem).status(200);
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ message: 'SERVER ERROR!' });
        }
    }

    static async deleteItem(req: Request, res: Response) {
        try {
            const itemToDelete = Number(req.params.item_id);
            const deletedItem = await ItemModel.deleteItem(itemToDelete);
            res.json(deletedItem).status(200);
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ message: 'SERVER ERROR!' });
        }
    }
}
export = ItemController;