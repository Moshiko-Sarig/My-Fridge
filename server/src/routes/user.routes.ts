import express, { Router } from "express";
import UserController from "../controllers/user.controller";

const router: Router = express.Router();



router.get('/verify-email', UserController.verifyEmail);
router.get('/check-auth', UserController.checkAuth);
router.patch('/update-password', UserController.updateExistPassword);
router.post("/register", UserController.Register);
router.post("/login", UserController.login);
router.post("/checkEmail", UserController.checkEmailExists)
router.post('/send-verification-email', UserController.sendVerificationEmail);
router.post("/send-restart-password-email", UserController.SendResetPasswordEmail);

export default router;
