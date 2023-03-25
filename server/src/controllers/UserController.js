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

  static async getUserById(req, res) {
    try {
      const user_id = req.params.id;
      const users = await UserModel.getUserById(user_id);
      res.json(users).status(200);
    }
    catch (error) {
      console.error(error);
      res.status(500).json({ message: 'SERVER ERROR!' });
    }
  }

  static async addUser(req, res) {
    try {
      const user = req.body;
      const newUser = await UserModel.addUser(user);
      res.json(newUser).status(200);
    }
    catch (error) {
      console.error(error);
      res.status(500).json({ message: 'SERVER ERROR!' });
    }
  }
}

module.exports = UserController;
