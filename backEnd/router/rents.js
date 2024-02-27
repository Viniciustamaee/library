const rentsControllers = require('../controllers/rents');
const valid = require('../middleware')
const express = require('express')
const router = express();


router.get('/', valid, rentsControllers.allRents);
router.post('/', valid, rentsControllers.newRents)
router.delete('/:id', valid, rentsControllers.delete);
router.put('/:id', valid, rentsControllers.update);


module.exports = router