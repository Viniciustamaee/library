const authorsControllers = require('../controllers/author');
const valid = require('../middleware')
const express = require('express')
const router = express();



router.post('/', valid, (authorsControllers.new));
router.delete('/:id', valid, (authorsControllers.delete));
router.put('/:id', valid, authorsControllers.updateName);
router.get('/', authorsControllers.allAuthors);
router.get('/:id', authorsControllers.oneAuthor)


module.exports = router