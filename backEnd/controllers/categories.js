const Categories = require('../models/Categories')



module.exports.allCategories = async (req, res) => {
    try {
        const allCategoriesResult = await Categories.allCategory();
        console.log(allCategoriesResult);
        res.status(200).json({ "mensagem": `Pego todas as informações` });
    } catch (error) {
        console.error(error);
        res.status(500).json({ "mensagem": "Erro interno do servidor" });
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
            res.status(422).json({ "mensagem": "Este category já existe!" });

        } else {
            await Categories.insertCategory(category_name);
            res.status(200).json({ "mensagem": "Category inserido com sucesso!" });
        }

    } catch (error) {
        res.status(500).json({ "mensagem": "Erro interno do servidor" });
    }
}

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
        const existingId = await Categories.foundOneId(id);

        if (existingId.length >= 1) {
            await Categories.Delete(id)
            res.status(200).json({ "mensagem": "Autor apagado com sucesso" });

        } else {
            res.status(422).json({ "mensagem": "Não existe esse id de author" });

        }

    } catch (error) {
        res.status(500).json({ "mensagem": "Erro interno do servidor" });

    };
};

module.exports.updateCategory = async (req, res) => {
    let { category_name } = req.body;
    let { id } = req.params

    if (!/^[1-9]\d*$/.test(id)) {
        res.status(400).json({ "mensagem": "O 'id' deve ser um número inteiro positivo e não pode ter letras!!" });
        return;
    }

    if (category_name == "") {
        res.status(422).json({ "mensagem": "Campo Nome é obrigatório!" });
    }

    try {
        const existingId = await Categories.foundOneId(id);
        if (existingId.length >= 1) {
            await Categories.update(category_name, id)
            res.status(200).json({ "mensagem": "Autor atualizado com sucesso" });
        } else {
            res.status(422).json({ "mensagem": "Não existe esse id de author" });
        }

    } catch (erro) {
        res.status(500).json({ "mensagem": "Erro interno do servidor" });
    }
}