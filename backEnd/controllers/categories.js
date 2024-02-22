const Categories = require('../models/Categories')
const idEmpty = require('../validation/id')


module.exports.allCategories = async (req, res) => {
    try {
        const allCategoriesResult = await Categories.allCategory();
        return res.status(200).json(allCategoriesResult);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ "mensagem": "Erro interno do servidor" });
    }
}

module.exports.new = async (req, res) => {
    const { category_name } = req.body

    if (category_name === "") {
        res.status(422).json({ "mensagem": "Campo Nome é obrigatório!" });
        return;
    }

    try {
        const existingCategory = await Categories.foundOneName(category_name);

        if (existingCategory.length >= 1) {
            return res.status(422).json({ "mensagem": "Este category já existe!" });

        } else {
            await Categories.insertCategory(category_name);
            return res.status(200).json({ "mensagem": "Category inserido com sucesso!" });
        }

    } catch (error) {
        return res.status(500).json({ "mensagem": "Erro interno do servidor" });
    }
}

module.exports.delete = async (req, res) => {
    const { id } = req.params
    idEmpty(req, id)

    try {
        const existingId = await Categories.foundOneId(id);

        if (existingId.length >= 1) {
            await Categories.Delete(id)
            return res.status(200).json({ "mensagem": "Autor apagado com sucesso" });

        } else {
            return res.status(422).json({ "mensagem": "Não existe esse id de author" });

        }

    } catch (error) {
        return res.status(500).json({ "mensagem": "Erro interno do servidor" });

    };
};

module.exports.updateCategory = async (req, res) => {
    let { category_name } = req.body;
    let { id } = req.params
    idEmpty(req, id)

    if (category_name == "") {
        return res.status(422).json({ "mensagem": "Campo Nome é obrigatório!" });
    }

    try {
        const existingId = await Categories.foundOneId(id);
        if (existingId.length >= 1) {
            await Categories.update(category_name, id)
            return res.status(200).json({ "mensagem": "Autor atualizado com sucesso" });
        } else {
            return res.status(422).json({ "mensagem": "Não existe esse id de author" });
        }

    } catch (erro) {
        return res.status(500).json({ "mensagem": "Erro interno do servidor" });
    }
}