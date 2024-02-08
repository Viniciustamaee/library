const express = require('express')
const router = express();
const categoriesControllers = require('../controllers/categories')

router.get('/', (req, res) => {
    res.send('opaaaaa')
})

router.post('/', categoriesControllers.new)

module.exports = router