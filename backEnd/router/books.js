const booksControllers = require('../controllers/books')
const { isLoggin } = require('../middleware')
const express = require('express')
const router = express();



router.get('/', booksControllers.allBooks);
// router.get('/new',);
router.post('/', booksControllers.newBooks)
router.get('/:id', isLoggin, booksControllers.oneBooks);
router.delete('/:id', isLoggin, booksControllers.delete);
// router.get('/:id/edit',);
router.put('/:id', isLoggin, booksControllers.updateBooks);


module.exports = router