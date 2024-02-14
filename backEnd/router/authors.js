const authorsControllers = require('../controllers/author');
const { isLoggin } = require('../middleware')
const express = require('express')
const router = express();



router.post('/', isLoggin, (authorsControllers.new));
router.delete('/:id', isLoggin, (authorsControllers.delete));
router.put('/:id', isLoggin, authorsControllers.updateName);


module.exports = router