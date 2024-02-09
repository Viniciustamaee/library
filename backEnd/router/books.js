const express = require('express')
const router = express();
const booksControllers = require('../controllers/books')


router.get('/', booksControllers.allBooks);
// router.get('/new',);
router.get('/:id', booksControllers.oneBooks);
router.post('/', booksControllers.newBooks)
router.delete('/:id', booksControllers.delete);
// router.get('/:id/edit',);
router.put('/:id', booksControllers.updateBooks);


module.exports = router