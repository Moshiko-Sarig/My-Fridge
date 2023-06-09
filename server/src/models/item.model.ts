import { executeQueryAsync } from '../database/db';
import queries from "../queries/item.queries";
class ItemModel {
    static async getItemsByUserId(user_id: number) {
        try {
            const result = await executeQueryAsync(queries.GET_ITEMS_BY_USER_ID, [user_id]);
            return result;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    static async addItem(item: { category_name: string; item_name: string; quantity: number; expiration_date: string; user_id: number }) {
        try {
            const result = await executeQueryAsync(queries.ADD_ITEM, [
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

    static async editItem(itemToEdit: { category_name: string; item_name: string; quantity: number; expiration_date: string; item_id: number; user_id: number }) {
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

    static async deleteItem(item_id: number) {
        try {
            const result = await executeQueryAsync(queries.DELETE_ITEM, [item_id]);
            return result;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}

export = ItemModel;
