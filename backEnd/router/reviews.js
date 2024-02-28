const reviewsControll = require('../controllers/reviews')
const valid = require('../middleware')
const express = require('express')
const router = express();

router.get('/:id', reviewsControll.allReviews);
router.post('/:id', valid, reviewsControll.new)
router.delete('/:id/:idReview', valid, reviewsControll.delete);

module.exports = router