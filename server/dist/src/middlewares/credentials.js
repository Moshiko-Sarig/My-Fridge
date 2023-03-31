"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const joi_1 = __importDefault(require("joi"));
class Credentials {
    constructor(credentials) {
        this.email = credentials.email;
        this.password = credentials.password;
    }
    validate() {
        const result = Credentials.validationSchema.validate(this, { abortEarly: false });
        console.log('The credentials are: ', result);
        return result.error ? result.error.details.map((err) => err.message) : null;
    }
}
Credentials.validationSchema = joi_1.default.object({
    email: joi_1.default.string()
        .email()
        .required()
        .min(4)
        .max(90)
        .messages({
        'string.email': 'Email must be a valid email address.',
        'string.empty': 'Email is required.',
        'string.min': 'Email must be at least 4 characters long.',
        'string.max': 'Email must be no longer than 90 characters.',
    }),
    password: joi_1.default.string()
        .required()
        .min(3)
        .max(225)
        .messages({
        'string.empty': 'Password is required.',
        'string.min': 'Password must be at least 3 characters long.',
        'string.max': 'Password must be no longer than 225 characters.',
    }),
});
module.exports = Credentials;
