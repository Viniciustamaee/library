const rentsControllers = require('../controllers/rents');
const { isLoggin } = require('../middleware')
const express = require('express')
const router = express();


router.get('/', rentsControllers.allRents);
// // router.get('/new',);
router.post('/', isLoggin, rentsControllers.newRents)
// router.get('/:id');
router.delete('/:id', isLoggin, rentsControllers.delete);
// // router.get('/:id/edit',);
router.put('/:id', isLoggin, rentsControllers.update);


module.exports = router