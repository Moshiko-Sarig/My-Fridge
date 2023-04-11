import { Request, Response } from 'express';
import UserModel from '../models/user.model';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Credentials from '../middlewares/credentials';


function validateRequestBody(user: any) {
  const requiredFields = ['email', 'password', 'first_name', 'last_name', 'phone_number'];
  for (const field of requiredFields) {
    if (!user.hasOwnProperty(field) || !user[field]) {
      return `Field "${field}" is missing or empty`;
    }
  }
  return false;
}
class UserController {



  static async checkEmailExists(req: Request, res: Response) {
    try {
        const email = req.body.email;
        const emailExists = await UserModel.checkIfEmailExists(email);
        res.status(200).json({ emailExists: emailExists.length > 0 });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: 'SERVER ERROR!' });
    }
}


  static async Register(req: Request, res: Response) {
    try {
      const user = req.body;
      console.log('Received user:', user);

      const validationResult = validateRequestBody(user);
      if (validationResult) {
        console.log(`Validation error: ${validationResult}`);
        res.status(400).json({ error: validationResult });
        return;
      }

      // console.log(user);
      // console.log('the user email is :', user.email);
      const emailExists = await UserModel.checkIfEmailExists(user.email);
      console.log('Email exists:', emailExists);
      if (emailExists.length > 0) {
        return res.status(400).json({ message: 'Email already exists' });
      }
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(user.password, salt);
      const newUser = await UserModel.addUser(user);
      console.log('New user:', newUser);
      res.status(201).json({ success: true, user: newUser });
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, message: 'SERVER ERROR!' });
    }
  }

  static async login(req: Request, res: Response) {
    try {
      const credentials = new Credentials(req.body);
      const errors = credentials.validate();
      if (errors) return res.status(400).send(errors);

      const user = await UserModel.login(credentials);

      if (!user) return res.status(401).json('Incorrect username or password.');
      const token = jwt.sign({ user }, process.env.TOKEN_SECRET as string, { expiresIn: '30min' });
      res.header('Authorization', token).send({ token });
      console.log(token);
    } catch (error) {
      res.status(500).json((error as Error).message);
      console.log(error);
    }
  }
}

export = UserController;
