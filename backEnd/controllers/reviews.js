const Reviews = require('../models/Reviews')

module.exports.allReviews = async (req, res) => {
    const { id } = req.params

    try {
        const allReviewBook = await Reviews.allReviewBook(id);

        if (allReviewBook == '') {
            return res.status(401).json({ "mensagem": "Não existe comentarios" })
        }

        return res.status(200).json(allReviewBook);
    } catch (error) {
        return res.status(500).json({ "mensagem": "Erro interno do servidor" });
    }
}

module.exports.new = async (req, res) => {
    const { comment, rating, user_id } = req.body
    const { id } = req.params

    if (!comment || !rating || !user_id) {
        return res.status(422).json({ "mensagem": "Campo é obrigatório!" })
    }

    try {
        await Reviews.newReview(comment, rating, user_id, id);
        return res.status(200).json({ "mensagem": "Reviews inserido com sucesso!" });


    } catch (error) {
        return res.status(500).json({ "mensagem": "Erro interno do servidor" });
    }
}

module.exports.delete = async (req, res) => {
    const { idReview } = req.params

    try {
        await Reviews.Delete(idReview)
        return res.status(200).json({ "mensagem": "reviews apagado com sucesso" });

    } catch (error) {
        return res.status(500).json({ "mensagem": "Erro interno do servidor" });
    }
}