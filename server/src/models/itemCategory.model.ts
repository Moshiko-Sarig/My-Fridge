import { executeQueryAsync } from "../database/db";
import queries from "../queries/itemCategory.queries";

interface Category {
  category_name: string;
  category_id: number;
}

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

  static async addCategory(category: Category) {
    try {
      const result = await executeQueryAsync(queries.ADD_CATEGORY, [category.category_name]);
      return result;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  static async editCategory(category: Category) {
    try {
      const result = await executeQueryAsync(queries.EDIT_CATEGORY, [
        category.category_name,
        category.category_id,
      ]);
      return result;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  static async deleteCategory(category_id: number) {
    try {
      const result = await executeQueryAsync(queries.DELETE_CATEGORY, [category_id]);
      return result;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}

export default ItemCategoryModel;
