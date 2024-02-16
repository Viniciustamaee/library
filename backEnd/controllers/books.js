const Books = require('../models/Books')
const cloudinary = require('../cloud/config')

module.exports.allBooks = async (req, res) => {
    try {
        const allBooksResult = await Books.allTheBooks();
        return res.status(200).json({ "mensagem": `Pego todas as informações` });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ "mensagem": "Erro interno do servidor" });
    }
}

module.exports.newBooks = async (req, res) => {
    const { title, quantity_available,img, author_id, category_id } = req.body


    if (!title || !quantity_available || !img || !author_id || !category_id) {
        return res.status(422).json({ "mensagem": "Campo é obrigatório!" });
    }

    try {
        const existingTitle = await Books.foundOneName(title);
        if (existingTitle.length >= 1) {
            return res.status(422).json({ "mensagem": "Este livro já existe!" });

        } else {
            await Books.newBooks(title, quantity_available, img, author_id, category_id);
            return res.status(200).json({ "mensagem": "Livro inserido com sucesso!" });

        }
    } catch (error) {
        return res.status(500).json({ "mensagem": "Erro interno do servidor" });
    }
};

module.exports.oneBooks = async (req, res) => {
    const { id } = req.params

    if (!/^[1-9]\d*$/.test(id)) {
        res.status(400).json({ "mensagem": "O 'id' deve ser um número inteiro positivo e não pode ter letras!!" });
        return;
    }

    try {
        const achei = await Books.oneBook(id);
        return res.status(200).json({ "mensagem": "Um book" });

    } catch (error) {
        return res.status(500).json({ "mensagem": "Erro interno do servidor" });
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
        const existingId = await Books.oneBook(id);
        if (existingId.length >= 1) {
            await Books.Delete(id)
            return res.status(200).json({ "mensagem": "Book apagado com sucesso" });
        } else {
            return res.status(422).json({ "mensagem": "Não existe esse id de Books" });
        }

    } catch (error) {
        return res.status(500).json({ "mensagem": "Erro interno do servidor" });
    }
}

module.exports.updateBooks = async (req, res) => {
    let { title, quantity_available, img, author_id, category_id } = req.body;
    let { id } = req.params

    try {
        const existingId = await Books.oneBook(id);
        if (existingId.length >= 1) {
            await Books.update(title, quantity_available, img, author_id, category_id, id)
            return res.status(200).json({ "mensagem": "Autor atualizado com sucesso" });
        } else {
            return res.status(422).json({ "mensagem": "Não existe esse id de author" });
        }

    } catch (erro) {
        return res.status(500).json({ "mensagem": "Erro interno do servidor" });
    }
}
