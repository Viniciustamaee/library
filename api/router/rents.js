const rentsControllers = require('../controllers/rents');
const valid = require('../middleware')
const express = require('express')
const router = express();


router.get('/', rentsControllers.allRents);
router.post('/', rentsControllers.newRents);
router.get('/:id', rentsControllers.allRentsUser)
router.delete('/:id', rentsControllers.delete);
router.put('/:id', rentsControllers.update);
router.get('/:id/Rents', rentsControllers.oneRent)


module.exports = router