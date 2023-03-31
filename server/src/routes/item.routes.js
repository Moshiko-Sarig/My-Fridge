const express = require('express');
const router = express.Router();
const ItemController = require('../controllers/item.controller');
const middleware = require("../middlewares/auth")
//TODO:add middleware to the routes 

router.get('/items/:id', ItemController.getItemsByUserId);
router.post('/items/add/new/item', ItemController.addItem);
router.put('/items/edit/item', ItemController.editItem);
router.delete('/items/delete/:item_id',ItemController.deleteItem);


module.exports = router;