"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const itemCategoryQueries = {
    GET_ALL_CATEGORIES: `SELECT * FROM item_category`,
    ADD_CATEGORY: `
      INSERT INTO item_category
      (category_name)
      VALUES
      (?)
    `,
    EDIT_CATEGORY: `
      UPDATE item_category
      SET
      category_name = ?
      WHERE category_id = ?
    `,
    DELETE_CATEGORY: `DELETE FROM item_category WHERE category_id = ?`,
};
exports.default = itemCategoryQueries;
