"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const user_model_1 = __importDefault(require("../models/user.model"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const credentials_1 = __importDefault(require("../middlewares/credentials"));
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
            // console.log(user);
            // console.log('the user email is :', user.email);
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
