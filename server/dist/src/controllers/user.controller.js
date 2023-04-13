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
function validateRequestBody(user) {
    const requiredFields = ['email', 'password', 'first_name', 'last_name', 'phone_number'];
    for (const field of requiredFields) {
        if (!user.hasOwnProperty(field) || !user[field]) {
            return `Field "${field}" is missing or empty`;
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
            // Verify the token
            jsonwebtoken_1.default.verify(token, user_config_1.config.EMAIL_SECRET, async (err, decoded) => {
                if (err || !decoded || typeof decoded === 'string') {
                    return res.status(400).json({ error: 'Invalid or expired verification token' });
                }
                const jwtPayload = decoded;
                console.log(jwtPayload);
                const userId = jwtPayload.id;
                if (!jwtPayload.id) {
                    return res.status(400).json({ error: 'Invalid token payload' });
                }
                // Update the user's email_verified status to true
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
            const token = jsonwebtoken_1.default.sign({ id: emailExists[0].user_id }, user_config_1.config.EMAIL_SECRET, { expiresIn: '10min' });
            console.log('emailExists:', emailExists);
            console.log('Token:', token);
            // Configure your email provider and credentials
            const transporter = nodemailer_1.default.createTransport(user_config_1.config.emailTransport);
            const mailOptions = {
                from: user_config_1.config.emailFrom,
                to: email,
                subject: 'Email Verification',
                text: `Click the link to verify your email: ${user_config_1.config.CLIENT_URL}/verify-email?token=${token}`,
            };
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.error('Error details:', error); // Add this line to log the error details
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
            res.header('Authorization', token).send({ token });
            console.log(token);
        }
        catch (error) {
            res.status(500).json(error.message);
            console.log(error);
        }
    }
}
module.exports = UserController;
