module.exports = {
    GET_USERS: `SELECT * FROM user`,
    GET_SINGLE_USER: `SELECT * FROM user WHERE user_id = ?`,
    ADD_USER: `
        INSERT INTO user
        (e-mail, password, first_name, last_name, intentional_use, company_name, phone_number)
        VALUES 
        (?, ?, ?, ?, ?, ?, ?)
    `,
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
    DELETE_ITEM: `DELETE FROM item WHERE item_id = ?`
};