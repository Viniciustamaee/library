const Reviews = require('../models/Review')

module.exports.allReviews = async (req, res) => {
    const { id } = req.params

    if (!/^[1-9]\d*$/.test(id)) {
        res.status(400).json({ "message": "The 'id' cannot be a letter or negative number!!" });
        return;
    }

    try {
        const allReviewBook = await Reviews.allReviewBook(id);
        return res.status(200).json(allReviewBook);
    } catch (error) {
        return res.status(500).json({ "message": "Internal server error" });
    }
}

module.exports.new = async (req, res) => {
    const { comment, rating, user_id } = req.body
    const { id } = req.params

    if (!user_id) {
        return res.status(422).json({ "message": "Camp is mandatory!!" })
    }

    if (!/^[1-9]\d*$/.test(id)) {
        res.status(400).json({ "message": "The 'id' cannot be a letter or negative number!!" });
        return;
    }

    try {
        await Reviews.newReview(comment, rating, user_id, id);
        return res.status(200).json({ "message": "Review insert with success" });

    } catch (error) {
        return res.status(500).json({ "message": "Internal server error" });
    }
}

module.exports.delete = async (req, res) => {
    const { idReview } = req.params

    if (!/^[1-9]\d*$/.test(idReview)) {
        res.status(400).json({ "message": "The 'id' cannot be a letter or negative number!!" });
        return;
    }

    try {
        await Reviews.Delete(idReview)
        return res.status(200).json({ "message": "Review delete with success" });

    } catch (error) {
        return res.status(500).json({ "message": "Internal server error" });
    }
}