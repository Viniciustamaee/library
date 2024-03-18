const categoriesControllers = require('../controllers/categories')
const valid = require('../middleware')
const express = require('express')
const router = express();

router.get('/', categoriesControllers.allCategories)
router.post('/', valid, categoriesControllers.new)
router.delete('/:id', valid, categoriesControllers.delete);
router.put('/:id', valid, categoriesControllers.updateCategory);

module.exports = router