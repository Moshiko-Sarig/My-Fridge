import express, { Router } from "express";
import UserController from "../controllers/user.controller";

const router: Router = express.Router();



router.post("/register", UserController.Register);
router.post("/login", UserController.login);
router.post("/checkEmail", UserController.checkEmailExists);

export default router;
