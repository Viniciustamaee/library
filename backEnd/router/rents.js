const rentsControllers = require('../controllers/rents');
const valid = require('../middleware')
const express = require('express')
const router = express();


router.get('/', rentsControllers.allRents);
router.post('/', rentsControllers.newRents)
router.delete('/:id', rentsControllers.delete);
router.put('/:id', rentsControllers.update);


module.exports = router