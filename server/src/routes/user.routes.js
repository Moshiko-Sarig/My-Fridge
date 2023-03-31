const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user.controller');


//TODO:add middleware to the routes 


router.post('/register', UserController.Register);
router.post('/login', UserController.login)

module.exports = router;