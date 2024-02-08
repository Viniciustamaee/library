const Categories = require('../models/Categories')

module.exports.new = async (req, res) => {
    const { category_name } = req.body
    if (category_name === "") {
        res.status(422).json({ "mensagem": "Campo Nome é obrigatório!" });
    }
    try {
        const existingCategory = await Categories.foundOne(category_name);
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