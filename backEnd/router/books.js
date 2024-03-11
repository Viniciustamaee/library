const booksControllers = require('../controllers/books')
const { storage } = require('../cloudinary/cloud')
const valid = require('../middleware')
const multer = require('multer')
const express = require('express')
const upload = multer({ storage })
const router = express();



router.get('/', booksControllers.allBooks);
router.get('/:id', booksControllers.oneBooks)
router.post('/', valid, upload.single('img'), booksControllers.newBooks)
router.get('/:id', booksControllers.oneBooks);
router.delete('/:id', valid, booksControllers.delete);
router.put('/:id', valid, upload.single('img'), booksControllers.updateBooks);


module.exports = router