const express = require('express');
const router = express.Router();
const ItemCategoryController = require ('../controllers/ItemCategoryController');


router.get('/categories', ItemCategoryController.getCategories);
router.post('/categories/add/new/category', ItemCategoryController.addCategory);
router.put('/categories/edit/category', ItemCategoryController.editCategory);
router.delete('/categories/delete/:category_id', ItemCategoryController.deleteCategory);



module.exports = router;