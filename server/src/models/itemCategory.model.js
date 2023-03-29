const { executeQueryAsync } = require('../database/db');
const queries = require('../queries/itemCategory.queries');


class ItemCategoryModel {
    static async getAllCategories() {
        try {
            const result = await executeQueryAsync(queries.GET_ALL_CATEGORIES);
            return result;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    static async addCategory(category) {
        try {
            const result = await executeQueryAsync(queries.GET_ALL_CATEGORIES, [category.category_name]);
            return result;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    static async editCategory(category) {
        try {
            const result = await executeQueryAsync(queries.GET_ALL_CATEGORIES, [
                category.category_name,
                category.category_id
            ]);
            return result;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    static async deleteCategory(category_id) {
        try {
            const result = await executeQueryAsync(queries.GET_ALL_CATEGORIES, [category_id]);
            return result;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}


module.exports = ItemCategoryModel;