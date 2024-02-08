const express = require('express')
const router = express();

router.get('/', (req, res) => {
    res.send('All the books')
});

router.post('/resgiter', (req, res) => {
    res.send('foi')
})

module.exports = router