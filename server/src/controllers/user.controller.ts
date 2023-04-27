import { Request, Response } from 'express';
import UserModel from '../models/user.model';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Credentials from '../middlewares/credentials';
import nodemailer from 'nodemailer';
import { JwtPayload } from 'jsonwebtoken';
import { verifyEmailConfig, recoverPasswordConfig } from '../config/user.config';
import { CookieEnum } from '../middlewares/cookie.enum';
import { log } from 'console';




function validateRequestBody(user: any) {
  const requiredFields = ['email', 'password', 'first_name', 'last_name', 'phone_number'];
  for (const field of requiredFields) {
    if (!user.hasOwnProperty(field) || !user[field]) {
      return (`Field "${field}" is missing or empty`);
    }
  }
  return false;
}
class UserController {

  static async verifyEmail(req: Request, res: Response) {//change the status of the user email verify to true
    try {
      const token = req.query.token;
      if (typeof token !== 'string') {
        return res.status(400).json({ error: 'Invalid token' });
      }
      jwt.verify(token, verifyEmailConfig.EMAIL_SECRET, async (err, decoded) => {
        if (err || !decoded || typeof decoded === 'string') {
          return res.status(400).json({ error: 'Invalid or expired verification token' });
        }
        const jwtPayload = decoded as JwtPayload;
        const userId = jwtPayload.id;
        if (!jwtPayload.id) {
          return res.status(400).json({ error: 'Invalid token payload' });
        }
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
      const token = jwt.sign({ id: emailExists[0].user_id }, verifyEmailConfig.EMAIL_SECRET, { expiresIn: '10min' });
      const transporter = nodemailer.createTransport(verifyEmailConfig.emailTransport);
      const mailOptions = {
        from: verifyEmailConfig.emailFrom,
        to: email,
        subject: 'Email Verification',
        html: `
          <div style="font-family: Arial, sans-serif; font-size: 16px; line-height: 1.5;">
            <h1 style="font-size: 24px;">Email Verification</h1>
            <p>Click the link below to verify your email:</p>
            <a href="${verifyEmailConfig.CLIENT_URL}/verify-email?token=${token}" style="display: inline-block; padding: 10px 20px; background-color: #4CAF50; color: white; text-decoration: none; border-radius: 4px;">Verify Email</a>
          </div>
        `,
      };
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log(error);
          
          return res.status(500).json({ error: 'Error sending email' });
        }
        res.json({ message: 'Verification email sent' });
      });

    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, message: 'SERVER ERROR!' });
    }
  }



  static async SendResetPasswordEmail(req: Request, res: Response) {
    try {
      const { email } = req.body;
      const emailExists = await UserModel.checkIfEmailExists(email);
      if (emailExists.length === 0) {
        return res.status(404).json({ error: 'User not found' });
      }
      const token = jwt.sign({ id: emailExists[0].user_id }, recoverPasswordConfig.EMAIL_SECRET, { expiresIn: '10min' });
      const transporter = nodemailer.createTransport(recoverPasswordConfig.emailTransport);
      const mailOptions = {
        from: recoverPasswordConfig.emailFrom,
        to: email,
        subject: 'Password Reset',
        html: `
          <div style="font-family: Arial, sans-serif; font-size: 16px; line-height: 1.5;">
            <h1 style="font-size: 24px;">Password Reset</h1>
            <p>Click the button below to reset your password:</p>
            <a href="${recoverPasswordConfig.PASSWORD_RESET_URL}/?:${token}" style="display: inline-block; padding: 10px 20px; background-color: #f44336; color: white; text-decoration: none; border-radius: 4px;">Reset Password</a>
          </div>
        `,
      };
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          return res.status(500).json({ error: 'Error sending email' });
        }
        res.json({ message: 'Password reset email sent' });
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, message: 'SERVER ERROR!' });
    }
  }


  static async updateExistPassword(req: Request, res: Response) {//change the password of exist user
    try {
      const { token, password } = req.body;
      jwt.verify(token, recoverPasswordConfig.EMAIL_SECRET, async (err: any, decoded: any) => {
        if (err || !decoded || typeof decoded === 'string') {
          return res.status(400).json({ error: 'Invalid or expired reset token' });
        }
        const jwtPayload = decoded as JwtPayload;
        const userId = jwtPayload.id;
        if (!jwtPayload.id) {
          return res.status(400).json({ error: 'Invalid token payload' });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        await UserModel.updateUserPassword(userId, hashedPassword);
        res.status(200).json({ message: 'Password updated successfully' });
      });
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
      res.cookie(CookieEnum.My_Fridge_Cookie, token, {
        maxAge: 30 * 60 * 1000,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
      }).send({ token });
    } catch (error) {
      res.status(500).json((error as Error).message);
      console.log(error);
    }
  }

  static async checkEmailExists(req: Request, res: Response) {//check if the user email is exist when register
    try {
      const email = req.body.email;
      const emailExists = await UserModel.checkIfEmailExists(email);
      res.status(200).json({ emailExists: emailExists.length > 0 });
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, message: 'SERVER ERROR!' });
    }
  }


  static async checkAuth(req: Request, res: Response) {
    try {
      const token = req.cookies['my fridge cookie'];
      if (!token) {
        return res.status(401).json({ error: 'Not authenticated' });
      } else {
        const decodedTokenData = jwt.verify(token, process.env.TOKEN_SECRET as string) as { user: object };
        res.json(decodedTokenData.user);
      }
    } catch (error) {
      console.log(error);
      res.status(401).json({ error: 'Not authenticated' });
      
    }
  }


}


export = UserController;
