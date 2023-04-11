"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function authenticateUser(req, res, next) {
    const token = req.header('Authorization');
    if (!token)
        return res.status(401).send('Access Denied');
    try {
        const verified = jsonwebtoken_1.default.verify(token, process.env.TOKEN_SECRET);
        req.user = verified;
        next();
    }
    catch (err) {
        res.status(400).send({ message: 'Invalid Token!' });
    }
}
function authorizeAdmin(req, res, next) {
    if (req.user.user.user_is_admin !== true) {
        return res.status(403).send({ error: 'Unauthorized: Not an admin' });
    }
    next();
}
module.exports = {
    authenticateUser,
    authorizeAdmin,
};
