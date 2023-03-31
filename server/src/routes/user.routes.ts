import express, { Router } from "express";
import UserController from "../controllers/user.controller";

const router: Router = express.Router();

// TODO: Add middleware to the routes

router.post("/register", UserController.Register);
router.post("/login", UserController.login);

export default router;
