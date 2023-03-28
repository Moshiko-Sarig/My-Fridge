const UserModel = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

class UserController {


  static async Register(req, res) {
    try {
      const user = req.body;
      console.log(user);
      console.log("the user email is :", user.email);
      const emailExists = await UserModel.checkIfEmailExists(user.email);
      if (emailExists.length > 0) {
        return res.status(400).json({ message: 'Email already exists' });
      }

      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(user.password, salt);
      const newUser = await UserModel.addUser(user);
      res.status(201).json({ success: true, user: newUser });
    }
    catch (error) {
      console.log(error);
      res.status(500).json({ success: false, message: 'SERVER ERROR!' });
    }
  }
}

module.exports = UserController;
