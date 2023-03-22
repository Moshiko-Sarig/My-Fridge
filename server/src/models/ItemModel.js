const { executeQueryAsync } = require('../database/db');
const queries = require('../services/Queries');


class ItemModel {
    static async getItemsByUserId(user_id) {
        try {
            const result = await executeQueryAsync(queries.GET_ITEMS_BY_USER_ID, [user_id]);
            return result;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    static async addItem(item) {
        try {
            const result = await executeQueryAsync(queries.GET_ITEMS_BY_USER_ID, [
                item.category_name,
                item.item_name,
                item.quantity,
                item.expiration_date,
                item.user_id
            ]);
            return result;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    static async editItem(itemToEdit) {
        try {
            const result = await executeQueryAsync(queries.EDIT_ITEM, [
                itemToEdit.category_name,
                itemToEdit.item_name,
                itemToEdit.quantity,
                itemToEdit.expiration_date,
                itemToEdit.item_id,
                itemToEdit.user_id
            ]);
            return result;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    static async deleteItem(item_id) {
        try {
            const result = await executeQueryAsync(queries.DELETE_ITEM, [item_id]);
            return result;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}


module.exports = ItemModel;