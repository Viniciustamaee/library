const Authors = require('../models/Authors')
const idEmpty = require('../validation/id')

module.exports.new = async (req, res) => {
    const { name } = req.body;

    if (name === "") {
        return res.status(422).json({ "mensagem": "Campo Nome é obrigatório!" });
    }

    try {
        const existingAuthor = await Authors.foundOneName(name);
        if (existingAuthor.length >= 1) {
            return res.status(409).json({ "mensagem": "Este autor já existe!" });
        } else {
            await Authors.newAuthors(name);
            return res.status(200).json({ "mensagem": "Autor inserido com sucesso!" });
        }
    } catch (error) {
        return res.status(500).json({ "mensagem": "Erro interno do servidor" });
    }
};

module.exports.delete = async (req, res) => {
    const { id } = req.params
    idEmpty(res, id)

    try {
        const existingId = await Authors.foundOneId(id);
        if (existingId.length >= 1) {
            await Authors.Delete(id)
            return res.status(200).json({ "mensagem": "Autor apagado com sucesso" });
        } else {
            return res.status(422).json({ "mensagem": "Não existe esse id de author" });
        }
    } catch (error) {
        return res.status(500).json({ "mensagem": "Erro interno do servidor" });
    }
}

module.exports.updateName = async (req, res) => {
    let { name } = req.body;
    let { id } = req.params
    idEmpty(res, id)


    if (name == "") {
        return res.status(422).json({ "mensagem": "Campo Nome é obrigatório!" });
    }

    try {
        const existingId = await Authors.foundOneId(id);
        if (existingId.length >= 1) {
            await Authors.update(name, id)
            return res.status(200).json({ "mensagem": "Autor atualizado com sucesso" });
        } else {
            return res.status(422).json({ "mensagem": "Não existe esse id de author" });
        }

    } catch (erro) {
        return res.status(500).json({ "mensagem": "Erro interno do servidor" });
    }
}


