const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');

router.get('/users', UserController.getUsers);
router.get('/users/:id', UserController.getUserById);
router.post('/users/create/user', UserController.addUser);



module.exports = router;