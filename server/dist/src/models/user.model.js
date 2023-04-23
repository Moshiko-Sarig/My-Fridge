"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../database/db");
const user_queries_1 = __importDefault(require("../queries/user.queries"));
const user_queries_2 = __importDefault(require("../queries/user.queries"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
class UserModel {
    static async updateUserEmailVerified(userId, emailVerified) {
        try {
            const result = await (0, db_1.executeQueryAsync)(user_queries_1.default.UPDATE_EMAIL_VERIFIED, [emailVerified, userId]);
            return result;
        }
        catch (error) {
            console.error(error);
            throw error;
        }
    }
    static async addUser(user) {
        try {
            const result = await (0, db_1.executeQueryAsync)(user_queries_1.default.ADD_NEW_USER, [
                user.email,
                user.password,
                user.first_name,
                user.last_name,
                user.phone_number,
            ]);
            return result;
        }
        catch (error) {
            console.error(error);
            throw error;
        }
    }
    static async checkIfEmailExists(email) {
        try {
            const result = await (0, db_1.executeQueryAsync)(user_queries_2.default.CHECK_IF_EMAIL_EXIST, [email]);
            return result;
        }
        catch (error) {
            console.error(error);
            throw error;
        }
    }
    static async login(credentials) {
        try {
            const user = await (0, db_1.executeQueryAsync)(user_queries_1.default.LOGIN, [credentials.email]);
            if (!user || user.length < 1)
                return null;
            const hashedPassword = user[0].password;
            const isPasswordMatch = await bcryptjs_1.default.compare(credentials.password, hashedPassword);
            if (!isPasswordMatch)
                return null;
            delete user[0].password;
            return user[0];
        }
        catch (error) {
            console.log(error);
        }
    }
    static async updateUserPassword(user_id, newPassword) {
        try {
            const result = await (0, db_1.executeQueryAsync)(user_queries_1.default.UPDATE_USER_PASSWORD, [newPassword, user_id]);
            return result;
        }
        catch (error) {
            console.error(error);
            throw error;
        }
    }
}
exports.default = UserModel;
