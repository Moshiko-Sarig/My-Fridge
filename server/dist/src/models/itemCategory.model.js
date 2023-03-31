"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../database/db");
const itemCategory_queries_1 = __importDefault(require("../queries/itemCategory.queries"));
class ItemCategoryModel {
    static async getAllCategories() {
        try {
            const result = await (0, db_1.executeQueryAsync)(itemCategory_queries_1.default.GET_ALL_CATEGORIES);
            return result;
        }
        catch (error) {
            console.error(error);
            throw error;
        }
    }
    static async addCategory(category) {
        try {
            const result = await (0, db_1.executeQueryAsync)(itemCategory_queries_1.default.ADD_CATEGORY, [category.category_name]);
            return result;
        }
        catch (error) {
            console.error(error);
            throw error;
        }
    }
    static async editCategory(category) {
        try {
            const result = await (0, db_1.executeQueryAsync)(itemCategory_queries_1.default.EDIT_CATEGORY, [
                category.category_name,
                category.category_id,
            ]);
            return result;
        }
        catch (error) {
            console.error(error);
            throw error;
        }
    }
    static async deleteCategory(category_id) {
        try {
            const result = await (0, db_1.executeQueryAsync)(itemCategory_queries_1.default.DELETE_CATEGORY, [category_id]);
            return result;
        }
        catch (error) {
            console.error(error);
            throw error;
        }
    }
}
exports.default = ItemCategoryModel;
