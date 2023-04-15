import { Request, Response } from 'express';
import UserModel from '../models/user.model';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Credentials from '../middlewares/credentials';
import nodemailer from 'nodemailer';
import { JwtPayload } from 'jsonwebtoken';
import { log } from 'console';
import { config}  from '../config/user.config';


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

  static async verifyEmail(req: Request, res: Response) {
    try {
      const token = req.query.token;

      if (typeof token !== 'string') {
        return res.status(400).json({ error: 'Invalid token' });
      }
      // Verify the token
      jwt.verify(token, config.EMAIL_SECRET, async (err, decoded) => {
        if (err || !decoded || typeof decoded === 'string') {
          return res.status(400).json({ error: 'Invalid or expired verification token' });
        }

        const jwtPayload = decoded as JwtPayload;
        console.log(jwtPayload as JwtPayload);
        const userId = jwtPayload.id;

        if (!jwtPayload.id) {
          return res.status(400).json({ error: 'Invalid token payload' });
        }

        // Update the user's email_verified status to true
        await UserModel.updateUserEmailVerified(userId, true);
        res.status(200).redirect('http://localhost:5173/email-verified');

      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, message: 'SERVER ERROR!' });
    }
  }


  static async sendVerificationEmail(req: Request, res: Response) {
    try {
      const { email } = req.body;
      const emailExists = await UserModel.checkIfEmailExists(email);
      if (emailExists.length === 0) {
        return res.status(404).json({ error: 'User not found' });
      }

      const token = jwt.sign({ id: emailExists[0].user_id }, config.EMAIL_SECRET, { expiresIn: '10min' });
      console.log('emailExists:', emailExists);
      console.log('Token:', token);
      

      // Configure your email provider and credentials
      const transporter = nodemailer.createTransport(config.emailTransport);

      const mailOptions = {
        from: config.emailFrom,
        to: email,
        subject: 'Email Verification',
        text: `Click the link to verify your email: ${config.CLIENT_URL}/verify-email?token=${token}`,
      };


      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error('Error details:', error); // Add this line to log the error details
          return res.status(500).json({ error: 'Error sending email' });
        }
        res.json({ message: 'Verification email sent' });
      });

    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, message: 'SERVER ERROR!' });
    }
  }


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
