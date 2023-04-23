"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.executeQueryAsync = void 0;
const mysql_1 = __importDefault(require("mysql"));
const pool = mysql_1.default.createPool({
    host: "localhost",
    user: "root",
    database: "my_fridge",
    connectTimeout: 90000,
});
console.log("Connected to database");
async function executeQueryAsync(sqlCmd, values = []) {
    return new Promise((resolve, reject) => {
        pool.query(sqlCmd, values, (err, rows, fields) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(rows);
            }
        });
    });
}
exports.executeQueryAsync = executeQueryAsync;
