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

// validar no ront, para a pessoa nao entrar com caract, validar para se for 0 nao vai diminuir
module.exports.newRents = async (req, res) => {
    const { rented_date, due_date, id_book } = req.body

    if(!rented_date || !due_date || !id_book){
        return res.status(406).json({"erros":"Dados insuficientes"})
    }

    try {
        const bookData = await Rents.oneBook(id_book);
    
        if (bookData.length > 0) {
            await Rents.newRents(rented_date, due_date, id_book);
            return res.status(200).json({ "mensagem": "rents inserido com sucesso!" });
        } else {
            res.status(422).json({ "mensagem": "Não existe esse id de Books" });
        }
    
    } catch (error) {
        console.error("Erro ao buscar livro:", error);
        return res.status(500).json({ "mensagem": "Erro interno do servidor" });
    }
};

