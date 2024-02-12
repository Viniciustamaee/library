const express = require('express')
const router = express();
const rentsControllers = require('../controllers/rents');


router.get('/', rentsControllers.allRents);
// // router.get('/new',);
router.post('/', rentsControllers.newRents)
// router.get('/:id');
// router.delete('/:id');
// // router.get('/:id/edit',);
// router.put('/:id');


module.exports = router