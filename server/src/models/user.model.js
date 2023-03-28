const { executeQueryAsync } = require('../database/db');
const queries = require('../queries/user.queries');

class UserModel {


  static async addUser(user) {
    try {
      const result = await executeQueryAsync(queries.ADD_NEW_USER, [
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
}

module.exports = UserModel;