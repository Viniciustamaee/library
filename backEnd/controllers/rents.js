const Rents = require('../models/Rents');

module.exports.allRents = async (req, res) => {
    try {
        const allrentsResult = await Rents.allrents();
        return res.status(200).json(allrentsResult);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ "mensagem": "Erro interno do servidor" });
    }
};

module.exports.allRentsUser = async (req, res) => {
    const { id } = req.params
    try {
        const pfv = await Rents.allRentsUser(id);
        return res.status(200).json(pfv);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ "mensagem": "Erro interno do servidor" });
    }
};


module.exports.newRents = async (req, res) => {
    const { rented_date, due_date, book_id, user_id } = req.body

    if (!rented_date || !due_date || !book_id || !user_id) {
        return res.status(406).json({ "erros": "Dados insuficientes" })
    }

    try {
        const bookData = await Rents.oneBook(book_id);

        if (bookData !== null) {
            const quantityArray = await Rents.quantityAvailable(book_id);
            const quantity = quantityArray[0].quantity_available;

            if (quantity > 0) {
                await Rents.newRents(rented_date, due_date, book_id, user_id);
                return res.status(200).json({ "mensagem": "rents inserido com sucesso!" });
            }
            else {
                return res.status(422).json({ "mensagem": "Não existe produtos dentro do estoque" });

            }
        } else {
            return res.status(422).json({ "mensagem": "Não existe esse id de Books" });
        }

    } catch (error) {
        console.error("Erro ao buscar livro:", error);
        return res.status(500).json({ "mensagem": "Erro interno do servidor" });
    }
};

module.exports.update = async (req, res) => {
    const { rented_date, due_date, book_id, user_id } = req.body
    const { id } = req.params

    if (!/^[1-9]\d*$/.test(id)) {
        res.status(400).json({ "mensagem": "O 'id' deve ser um número inteiro positivo e não pode ter letras!!" });
        return;
    }

    if (!rented_date || !due_date || !book_id || !user_id) {
        return res.status(406).json({ "erros": "Dados insuficientes" })
    }

    try {
        const bookData = await Rents.oneBook(book_id);

        if (bookData !== null) {
            const existingId = await Rents.oneRents(id);
            if (existingId.length >= 1) {
                await Rents.update(rented_date, due_date, book_id, user_id, id)
                return res.status(200).json({ "mensagem": "Troca atualizado com sucesso" });

            } else {
                return res.status(422).json({ "mensagem": "Não existe esse id de troca" });
            }

        } else {
            return res.status(422).json({ "mensagem": "Não existe esse id de Books" });
        }

    } catch (erro) {
        return res.status(500).json({ "mensagem": "Erro interno do servidor" });
    }
}

module.exports.delete = async (req, res) => {
    const { id } = req.params

    if (!/^[1-9]\d*$/.test(id)) {
        res.status(400).json({ "mensagem": "O 'id' deve ser um número inteiro positivo e não pode ter letras!!" });
        return;
    }

    try {
        const existingId = await Rents.oneRents(id);
        if (existingId.length > 0) {
            await Rents.Delete(id)
            res.status(200).json({ "mensagem": "Rents apagado com sucesso" });
        } else {
            res.status(422).json({ "mensagem": "Não existe esse id de Rents" });
        }
    } catch (error) {
        res.status(500).json({ "mensagem": "Erro interno do servidor" });
    }
};
