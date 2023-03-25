const { executeQueryAsync } = require('../database/db');
const queries = require('../services/Queries');


class UserModel {
  static async getUsers() {
    try {
      const result = await executeQueryAsync(queries.GET_USERS);
      return result;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  static async getUserById(user_id) {
    try {
      const result = await executeQueryAsync(queries.GET_SINGLE_USER, [user_id]);
      return result;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  static async addUser(user) {
    try {
      const result = await executeQueryAsync(queries.ADD_USER, [
        user.email,
        user.password,
        user.first_name,
        user.last_name,
        user.intentional_use,
        user.company_name,
        user.phone_number,
      ]);
      return result;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}

module.exports = UserModel;