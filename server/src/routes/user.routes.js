const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user.controller');



router.post('/register', UserController.Register);
router.post('/user/login',UserController.login)

module.exports = router;