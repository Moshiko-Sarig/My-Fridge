const UserModel = require('../models/UserModel');

class UserController {


  static async getUsers(req, res) {
    try {

      const users = await UserModel.getUsers();
      res.json(users).status(200);
    }

    catch (error) {
      console.error(error);
      res.status(500).json({ message: 'SERVER ERROR!' });
    }
  }

  
}

module.exports = UserController;
