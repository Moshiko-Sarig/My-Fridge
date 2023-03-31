const { executeQueryAsync } = require('../database/db');
const userQueries = require('../queries/user.queries');
const queries = require('../queries/user.queries');
const bcrypt = require('bcryptjs');

class UserModel {


  static async addUser(user) {
    try {
      const result = await executeQueryAsync(userQueries.ADD_NEW_USER, [
        user.email,
        user.password,
        user.first_name,
        user.last_name,
        user.phone_number,
      ]);
      return result;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }


  static async checkIfEmailExists(email) {
    try {
      const result = await executeQueryAsync(queries.CHECK_IF_EMAIL_EXIST, [email]);
      return result;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  static async login(credentials) {
    try {
      const user = await executeQueryAsync(userQueries.LOGIN, [credentials.email]);

      if (!user || user.length < 1) return null
      const hashedPassword = user[0].password;
      const isPasswordMatch = await bcrypt.compare(credentials.password, hashedPassword);
      if (!isPasswordMatch) return null;
      delete user[0].password;
      return user[0];

    }
    catch (error) {
      console.log(error);
    }
  }
}

module.exports = UserModel;