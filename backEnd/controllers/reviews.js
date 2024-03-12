const Reviews = require('../models/Reviews')

module.exports.allReviews = async (req, res) => {
    const { id } = req.params

    if (!/^[1-9]\d*$/.test(id)) {
        res.status(400).json({ "mensagem": "O 'id' deve ser um número inteiro positivo e não pode ter letras!!" });
        return;
    }

    try {
        const allReviewBook = await Reviews.allReviewBook(id);
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

    if (!/^[1-9]\d*$/.test(id)) {
        res.status(400).json({ "mensagem": "O 'id' deve ser um número inteiro positivo e não pode ter letras!!" });
        return;
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

    if (!/^[1-9]\d*$/.test(idReview)) {
        res.status(400).json({ "mensagem": "O 'id' deve ser um número inteiro positivo e não pode ter letras!!" });
        return;
    }

    try {
        await Reviews.Delete(idReview)
        return res.status(200).json({ "mensagem": "reviews apagado com sucesso" });

    } catch (error) {
        return res.status(500).json({ "mensagem": "Erro interno do servidor" });
    }
}