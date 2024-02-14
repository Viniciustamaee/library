const categoriesControllers = require('../controllers/categories')
const { isLoggin } = require('../middleware')
const express = require('express')
const router = express();

router.get('/', categoriesControllers.allCategories)
router.post('/', isLoggin, categoriesControllers.new)
router.delete('/:id', isLoggin, categoriesControllers.delete);
router.put('/:id', isLoggin, categoriesControllers.updateCategory);

module.exports = router