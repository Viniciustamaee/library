const { status } = require('express/lib/response');
const Authors = require('../models/Authors')

module.exports.new = async (req, res) => {
    const { name } = req.body;

    if (name === "") {
        res.status(422).json({ "mensagem": "Campo Nome é obrigatório!" });
    }

    try {
        const existingAuthor = await Authors.foundOneName(name);
        if (existingAuthor.length >= 1) {
            res.status(422).json({ "mensagem": "Este autor já existe!" });
        } else {
            await Authors.newAuthors(name);
            res.status(200).json({ "mensagem": "Autor inserido com sucesso!" });
        }
    } catch (error) {
        res.status(500).json({ "mensagem": "Erro interno do servidor" });
    }
};

module.exports.delete = async (req, res) => {
    const { id } = req.params

    if (!id) {
        res.status(404).json({ "mensagem": "Id vazio" });
        return
    }

    if (!/^[1-9]\d*$/.test(id)) {
        res.status(400).json({ "mensagem": "O 'id' deve ser um número inteiro positivo e não pode ter letras!!" });
        return;
    }

    try {
        const existingId = await Authors.foundOneId(id);
        if (existingId.length >= 1) {
            await Authors.Delete(id)
            res.status(200).json({ "mensagem": "Autor apagado com sucesso" });
        } else {
            res.status(422).json({ "mensagem": "Não existe esse id de author" });
        }
    } catch (error) {
        res.status(500).json({ "mensagem": "Erro interno do servidor" });
    }
}

module.exports.updateName = async (req, res) => {
    let { name } = req.body;
    let { id } = req.params

    if (!id) {
        res.status(404).json({ "mensagem": "Id vazio" });
        return
    }

    if (!/^[1-9]\d*$/.test(id)) {
        res.status(400).json({ "mensagem": "O 'id' deve ser um número inteiro positivo e não pode ter letras!!" });
        return;
    }


    if (name == "") {
        res.status(422).json({ "mensagem": "Campo Nome é obrigatório!" });
    }


    try {
        const existingId = await Authors.foundOneId(id);
        if (existingId.length >= 1) {
            await Authors.update(name, id)
            res.status(200).json({ "mensagem": "Autor atualizado com sucesso" });
        } else {
            res.status(422).json({ "mensagem": "Não existe esse id de author" });
        }

    } catch (erro) {
        res.status(500).json({ "mensagem": "Erro interno do servidor" });
    }
}


