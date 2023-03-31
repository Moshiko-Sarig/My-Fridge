const itemQueries = {
    GET_ITEMS_BY_USER_ID: `SELECT * FROM item WHERE user_id = ?`,
  
    ADD_ITEM: `
      INSERT INTO item
      (category_name, item_name, quantity, expiration_date, user_id)
      VALUES
      (?, ?, ?, ?, ?)
    `,
  
    EDIT_ITEM: `
      UPDATE item
      SET
      category_name= ?, item_name= ?, quantity=?, expiration_date= ?
      WHERE item_id = ? AND user_id = ?
    `,
  
    DELETE_ITEM: `DELETE FROM item WHERE item_id = ?`,
  };
  
  export default itemQueries;
  