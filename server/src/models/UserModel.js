const { executeQueryAsync } = require('../database/db');
const queries = require('../services/Queries');



class UserModel {



  static async getUsers() {
    try {
      const result = await executeQueryAsync(queries.SELECT_USERS);
      return result;
    } catch (error) {
      console.error(error);
      throw error;
    }

    
  }



}

module.exports = UserModel;
