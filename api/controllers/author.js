const Authors = require('../models/Author')

module.exports.allAuthors = async (req, res) => {
    try {
        const allAuthors = await Authors.allAuthors();
        return res.status(200).json(allAuthors);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ "mensagem": "Internal server error" });
    }
}

module.exports.oneAuthor = async (req, res) => {
    const { id } = req.params
    try {
        const oneAuthor = await Authors.oneAuthor(id);
        return res.status(200).json(oneAuthor);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ "mensagem": "Internal server error" });
    }
}


module.exports.new = async (req, res) => {
    const { name } = req.body;
    const realName = name.trim()

    if (!realName) {
        return res.status(422).json({ "mensagem": "Camp Name is mandatory!" });
    }

    try {
        const existingAuthor = await Authors.foundOneName(realName);
        if (existingAuthor.length >= 1) {
            return res.status(409).json({ "mensagem": "Exist the author" });
        }
        await Authors.newAuthors(realName);
        return res.status(200).json({ "mensagem": "Author insert with success!" });

    } catch (error) {
        return res.status(500).json({ "mensagem": "Internal server error" });
    }
};

module.exports.delete = async (req, res) => {
    const { id } = req.params

    if (!/^[1-9]\d*$/.test(id)) {
        res.status(400).json({ "mensagem": "The 'id' cannot be a letter or negative number!!" });
        return;
    }

    try {
        const existingId = await Authors.foundOneId(id);
        if (existingId.length >= 1) {
            const teste = await Authors.Delete(id)
            return res.status(200).json(teste);
        }
        return res.status(422).json({ "mensagem": "Dont existing the id of Author" });

    } catch (error) {
        return res.status(500).json({ "mensagem": "Internal server error" });
    }
}

module.exports.updateName = async (req, res) => {
    const { name } = req.body;
    const { id } = req.params

    if (!/^[1-9]\d*$/.test(id)) {
        res.status(400).json({ "mensagem": "The 'id' cannot be a letter or negative number!!" });
        return;
    }

    if (!name) {
        return res.status(422).json({ "mensagem": "Camp Name is mandatory!" });
    }

    try {
        const existingId = await Authors.foundOneId(id);
        if (existingId.length >= 1) {
            await Authors.update(name, id)
            return res.status(200).json({ "mensagem": "Author update with success" });
        }

        return res.status(422).json({ "mensagem": "Dont existing the id of Author" });

    } catch (erro) {
        return res.status(500).json({ "mensagem": "Internal server error" });
    }
}


