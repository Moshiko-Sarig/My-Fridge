"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const user_model_1 = __importDefault(require("../models/user.model"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const credentials_1 = __importDefault(require("../middlewares/credentials"));
const nodemailer_1 = __importDefault(require("nodemailer"));
const user_config_1 = require("../config/user.config");
const cookie_enum_1 = require("../middlewares/cookie.enum");
function validateRequestBody(user) {
    const requiredFields = ['email', 'password', 'first_name', 'last_name', 'phone_number'];
    for (const field of requiredFields) {
        if (!user.hasOwnProperty(field) || !user[field]) {
            return (`Field "${field}" is missing or empty`);
        }
    }
    return false;
}
class UserController {
    static async verifyEmail(req, res) {
        try {
            const token = req.query.token;
            if (typeof token !== 'string') {
                return res.status(400).json({ error: 'Invalid token' });
            }
            jsonwebtoken_1.default.verify(token, user_config_1.verifyEmailConfig.EMAIL_SECRET, async (err, decoded) => {
                if (err || !decoded || typeof decoded === 'string') {
                    return res.status(400).json({ error: 'Invalid or expired verification token' });
                }
                const jwtPayload = decoded;
                const userId = jwtPayload.id;
                if (!jwtPayload.id) {
                    return res.status(400).json({ error: 'Invalid token payload' });
                }
                await user_model_1.default.updateUserEmailVerified(userId, true);
                res.status(200).redirect('http://localhost:5173/email-verified');
            });
        }
        catch (error) {
            console.log(error);
            res.status(500).json({ success: false, message: 'SERVER ERROR!' });
        }
    }
    static async sendVerificationEmail(req, res) {
        try {
            const { email } = req.body;
            const emailExists = await user_model_1.default.checkIfEmailExists(email);
            if (emailExists.length === 0) {
                return res.status(404).json({ error: 'User not found' });
            }
            const token = jsonwebtoken_1.default.sign({ id: emailExists[0].user_id }, user_config_1.verifyEmailConfig.EMAIL_SECRET, { expiresIn: '10min' });
            const transporter = nodemailer_1.default.createTransport(user_config_1.verifyEmailConfig.emailTransport);
            const mailOptions = {
                from: user_config_1.verifyEmailConfig.emailFrom,
                to: email,
                subject: 'Email Verification',
                html: `
          <div style="font-family: Arial, sans-serif; font-size: 16px; line-height: 1.5;">
            <h1 style="font-size: 24px;">Email Verification</h1>
            <p>Click the link below to verify your email:</p>
            <a href="${user_config_1.verifyEmailConfig.CLIENT_URL}/verify-email?token=${token}" style="display: inline-block; padding: 10px 20px; background-color: #4CAF50; color: white; text-decoration: none; border-radius: 4px;">Verify Email</a>
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
        }
        catch (error) {
            console.log(error);
            res.status(500).json({ success: false, message: 'SERVER ERROR!' });
        }
    }
    static async SendResetPasswordEmail(req, res) {
        try {
            const { email } = req.body;
            const emailExists = await user_model_1.default.checkIfEmailExists(email);
            if (emailExists.length === 0) {
                return res.status(404).json({ error: 'User not found' });
            }
            const token = jsonwebtoken_1.default.sign({ id: emailExists[0].user_id }, user_config_1.recoverPasswordConfig.EMAIL_SECRET, { expiresIn: '10min' });
            const transporter = nodemailer_1.default.createTransport(user_config_1.recoverPasswordConfig.emailTransport);
            const mailOptions = {
                from: user_config_1.recoverPasswordConfig.emailFrom,
                to: email,
                subject: 'Password Reset',
                html: `
          <div style="font-family: Arial, sans-serif; font-size: 16px; line-height: 1.5;">
            <h1 style="font-size: 24px;">Password Reset</h1>
            <p>Click the button below to reset your password:</p>
            <a href="${user_config_1.recoverPasswordConfig.PASSWORD_RESET_URL}/?:${token}" style="display: inline-block; padding: 10px 20px; background-color: #f44336; color: white; text-decoration: none; border-radius: 4px;">Reset Password</a>
          </div>
        `,
            };
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    return res.status(500).json({ error: 'Error sending email' });
                }
                res.json({ message: 'Password reset email sent' });
            });
        }
        catch (error) {
            console.log(error);
            res.status(500).json({ success: false, message: 'SERVER ERROR!' });
        }
    }
    static async updateExistPassword(req, res) {
        try {
            const { token, password } = req.body;
            jsonwebtoken_1.default.verify(token, user_config_1.recoverPasswordConfig.EMAIL_SECRET, async (err, decoded) => {
                if (err || !decoded || typeof decoded === 'string') {
                    return res.status(400).json({ error: 'Invalid or expired reset token' });
                }
                const jwtPayload = decoded;
                const userId = jwtPayload.id;
                if (!jwtPayload.id) {
                    return res.status(400).json({ error: 'Invalid token payload' });
                }
                const salt = await bcryptjs_1.default.genSalt(10);
                const hashedPassword = await bcryptjs_1.default.hash(password, salt);
                await user_model_1.default.updateUserPassword(userId, hashedPassword);
                res.status(200).json({ message: 'Password updated successfully' });
            });
        }
        catch (error) {
            console.log(error);
            res.status(500).json({ success: false, message: 'SERVER ERROR!' });
        }
    }
    static async Register(req, res) {
        try {
            const user = req.body;
            console.log('Received user:', user);
            const validationResult = validateRequestBody(user);
            if (validationResult) {
                console.log(`Validation error: ${validationResult}`);
                res.status(400).json({ error: validationResult });
                return;
            }
            const emailExists = await user_model_1.default.checkIfEmailExists(user.email);
            console.log('Email exists:', emailExists);
            if (emailExists.length > 0) {
                return res.status(400).json({ message: 'Email already exists' });
            }
            const salt = await bcryptjs_1.default.genSalt(10);
            user.password = await bcryptjs_1.default.hash(user.password, salt);
            const newUser = await user_model_1.default.addUser(user);
            console.log('New user:', newUser);
            res.status(201).json({ success: true, user: newUser });
        }
        catch (error) {
            console.log(error);
            res.status(500).json({ success: false, message: 'SERVER ERROR!' });
        }
    }
    static async login(req, res) {
        try {
            const credentials = new credentials_1.default(req.body);
            const errors = credentials.validate();
            if (errors)
                return res.status(400).send(errors);
            const user = await user_model_1.default.login(credentials);
            if (!user)
                return res.status(401).json('Incorrect username or password.');
            const token = jsonwebtoken_1.default.sign({ user }, process.env.TOKEN_SECRET, { expiresIn: '30min' });
            res.cookie(cookie_enum_1.CookieEnum.My_Fridge_Cookie, token, {
                maxAge: 30 * 60 * 1000,
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'lax',
            }).send({ token });
        }
        catch (error) {
            res.status(500).json(error.message);
            console.log(error);
        }
    }
    static async checkEmailExists(req, res) {
        try {
            const email = req.body.email;
            const emailExists = await user_model_1.default.checkIfEmailExists(email);
            res.status(200).json({ emailExists: emailExists.length > 0 });
        }
        catch (error) {
            console.log(error);
            res.status(500).json({ success: false, message: 'SERVER ERROR!' });
        }
    }
    static async checkAuth(req, res) {
        try {
            const token = req.cookies['my fridge cookie'];
            if (!token) {
                return res.status(401).json({ error: 'Not authenticated' });
            }
            else {
                const decodedTokenData = jsonwebtoken_1.default.verify(token, process.env.TOKEN_SECRET);
                res.json(decodedTokenData.user);
            }
        }
        catch (error) {
            console.log(error);
            res.status(401).json({ error: 'Not authenticated' });
        }
    }
}
module.exports = UserController;
