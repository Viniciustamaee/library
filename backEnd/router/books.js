const booksControllers = require('../controllers/books')
const valid = require('../middleware')
const express = require('express')
const router = express();



router.get('/', booksControllers.allBooks);
router.post('/', valid, booksControllers.newBooks)
router.get('/:id', booksControllers.oneBooks);
router.delete('/:id', valid, booksControllers.delete);
router.put('/:id', valid, booksControllers.updateBooks);


module.exports = router