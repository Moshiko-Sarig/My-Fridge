"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const userQueries = {
    ADD_NEW_USER: `
      INSERT INTO 
        user
        (email, password, first_name, last_name, phone_number)
      VALUES 
      (?,?,?,?,?)
    `,
    CHECK_IF_EMAIL_EXIST: `SELECT * FROM \`user\` WHERE email = ?`,
    LOGIN: `SELECT * from user where email = ?`,
};
exports.default = userQueries;
