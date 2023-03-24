const ItemModel = require('../models/ItemModel');


class ItemController {
    static async getItemsByUserId(req, res) {
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

    static async addItem(req, res) {
        try {
            const itemToAdd = req.body;
            const newItem = await ItemModel.addItem(itemToAdd);
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
            const editedItem = await ItemModel.editItem(itemToEdit);
            res.json(editedItem).status(200);
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ message: 'SERVER ERROR!' });
        }
    }

    static async deleteItem(req, res) {
        try {
            const itemToDelete = req.params.item_id;
            const deletedItem = await ItemModel.editItem(itemToDelete);
            res.json(deletedItem).status(200);
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ message: 'SERVER ERROR!' });
        }
    }
}


module.exports = ItemController;