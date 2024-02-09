const express = require('express')
const router = express();
const authorsControllers = require('../controllers/author');



router.post('/', (authorsControllers.new));
router.delete('/:id', (authorsControllers.delete));
router.put('/:id', authorsControllers.updateName);


module.exports = router