const booksControllers = require('../controllers/books')
const express = require('express')
const router = express();



router.get('/', booksControllers.allBooks);
// router.get('/new',);
router.post('/', booksControllers.newBooks)
router.get('/:id', booksControllers.oneBooks);
router.delete('/:id', booksControllers.delete);
// router.get('/:id/edit',);
router.put('/:id', booksControllers.updateBooks);


module.exports = router