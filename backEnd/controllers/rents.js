const Rents = require('../models/Rents')

// all
module.exports.allRents = async (req, res) => {
    try {
        const allrentsResult = await Rents.allrents();
        console.log(allrentsResult);
        return res.status(200).json({ "mensagem": `Pego todas as informações` });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ "mensagem": "Erro interno do servidor" });
    }
};

module.exports.newRents = async (req, res) => {
    const { rented_date, due_date, id_book } = req.body

    if (!rented_date || !due_date || !id_book) {
        return res.status(406).json({ "erros": "Dados insuficientes" })
    }

    try {
        const bookData = await Rents.oneBook(id_book);
        const quantityArray = await Rents.quantityAvailable(id_book);
        const quantity = quantityArray[0].quantity_available;


        if (bookData.length > 0) {
            if (quantity > 0) {
                await Rents.newRents(rented_date, due_date, id_book);
                return res.status(200).json({ "mensagem": "rents inserido com sucesso!" });
            }
            else{
                res.status(422).json({ "mensagem": "Não existe produtos dentro do estoque" });

            }
        } else {
            res.status(422).json({ "mensagem": "Não existe esse id de Books" });
        }

    } catch (error) {
        console.error("Erro ao buscar livro:", error);
        return res.status(500).json({ "mensagem": "Erro interno do servidor" });
    }
};

