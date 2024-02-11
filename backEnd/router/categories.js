const express = require('express')
const router = express();
const categoriesControllers = require('../controllers/categories')

router.get('/', categoriesControllers.allCategories)
router.post('/', categoriesControllers.new)
router.delete('/:id', categoriesControllers.delete);
router.put('/:id', categoriesControllers.updateCategory);

module.exports = router