const express = require('express')
const router = express();
const authorsControllers = require('../controllers/author');


router.get('/', (req, res) => {
    res.send('All the authors')
});

router.post('/new', authorsControllers.new);



module.exports = router