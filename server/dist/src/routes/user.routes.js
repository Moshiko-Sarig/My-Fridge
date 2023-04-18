"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = __importDefault(require("../controllers/user.controller"));
const router = express_1.default.Router();
router.post("/register", user_controller_1.default.Register);
router.post("/login", user_controller_1.default.login);
router.post("/checkEmail", user_controller_1.default.checkEmailExists);
router.post('/send-verification-email', user_controller_1.default.sendVerificationEmail);
router.post("/send-restart-password-email", user_controller_1.default.SendResetPasswordEmail);
router.post('/update-password', user_controller_1.default.updateExistPassword);
router.get('/verify-email', user_controller_1.default.verifyEmail);
exports.default = router;
