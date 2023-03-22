const express = require('express');
const router = express.Router();
const ItemController = require('../controllers/ItemController');

router.get('/items/:id', ItemController.getItemsByUserId);
router.post('/items/add/new/item', ItemController.addItem);
router.put('/items/edit/item', ItemController.editItem);
router.delete('/items/delete/:item_id');


module.exports = router;