"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const item_model_1 = __importDefault(require("../models/item.model"));
class ItemController {
    static async getItems(req, res) {
        try {
            const allItems = await item_model_1.default.getAllItems();
            res.json(allItems).status(200);
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ message: 'SERVER ERROR!' });
        }
    }
    static async getItemById(req, res) {
        try {
            const itemId = req.params.id;
            const singleItem = await item_model_1.default.getItemsByUserId(itemId);
            res.json(singleItem).status(200);
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ message: 'SERVER ERROR!' });
        }
    }
    static async getLatestItem(req, res) {
        try {
            const singleItem = await item_model_1.default.getLatestItem();
            res.json(singleItem).status(200);
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ message: 'SERVER ERROR!' });
        }
    }
    static async getItemsByUserId(req, res) {
        try {
            const userId = req.params.id;
            const userItems = await item_model_1.default.getItemsByUserId(userId);
            res.json(userItems).status(200);
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ message: 'SERVER ERROR!' });
        }
    }
    static async addItem(req, res) {
        try {
            const itemToAdd = req.body;
            const response = await item_model_1.default.addItem(itemToAdd);
            const newItem = await item_model_1.default.getItemById(response.data.insertId);
            res.json(newItem).status(200);
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ message: 'SERVER ERROR!' });
        }
    }
    static async editItem(req, res) {
        try {
            const itemToEdit = req.body;
            const editedItem = await item_model_1.default.editItem(itemToEdit);
            res.json(editedItem).status(200);
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ message: 'SERVER ERROR!' });
        }
    }
    static async deleteItem(req, res) {
        try {
            const itemToDelete = Number(req.params.item_id);
            const deletedItem = await item_model_1.default.deleteItem(itemToDelete);
            res.json(deletedItem).status(200);
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ message: 'SERVER ERROR!' });
        }
    }
}
module.exports = ItemController;
