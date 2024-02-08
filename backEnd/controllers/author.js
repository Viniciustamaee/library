const Authors = require('../models/Authors')

module.exports.new = async (req, res) => {
    const { name } = req.body;
    if (name === "") {
        res.status(422).json({ "mensagem": "Campo Nome é obrigatório!" });
    }

    try {
        const existingAuthor = await Authors.foundOne(name);
        if (existingAuthor.length >= 1) {
            res.status(422).json({ "mensagem": "Este autor já existe!" });
        } else {
            await Authors.insertAuthors(name);
            res.status(200).json({ "mensagem": "Autor inserido com sucesso!" });
        }
    } catch (error) {
        res.status(500).json({ "mensagem": "Erro interno do servidor" });
    }
};
