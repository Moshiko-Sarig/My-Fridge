const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user.controller');



router.post('/register', UserController.Register);


module.exports = router;