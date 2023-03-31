"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const db_1 = require("../database/db");
const item_queries_1 = __importDefault(require("../queries/item.queries"));
class ItemModel {
    static async getItemsByUserId(user_id) {
        try {
            const result = await (0, db_1.executeQueryAsync)(item_queries_1.default.GET_ITEMS_BY_USER_ID, [user_id]);
            return result;
        }
        catch (error) {
            console.error(error);
            throw error;
        }
    }
    static async addItem(item) {
        try {
            const result = await (0, db_1.executeQueryAsync)(item_queries_1.default.ADD_ITEM, [
                item.category_name,
                item.item_name,
                item.quantity,
                item.expiration_date,
                item.user_id
            ]);
            return result;
        }
        catch (error) {
            console.error(error);
            throw error;
        }
    }
    static async editItem(itemToEdit) {
        try {
            const result = await (0, db_1.executeQueryAsync)(item_queries_1.default.EDIT_ITEM, [
                itemToEdit.category_name,
                itemToEdit.item_name,
                itemToEdit.quantity,
                itemToEdit.expiration_date,
                itemToEdit.item_id,
                itemToEdit.user_id
            ]);
            return result;
        }
        catch (error) {
            console.error(error);
            throw error;
        }
    }
    static async deleteItem(item_id) {
        try {
            const result = await (0, db_1.executeQueryAsync)(item_queries_1.default.DELETE_ITEM, [item_id]);
            return result;
        }
        catch (error) {
            console.error(error);
            throw error;
        }
    }
}
module.exports = ItemModel;
