const idEmpty = (res, id) => {
    if (!id) {
        res.status(404).json({ "mensagem": "Id vazio" });
        return;
    }

    if (!/^[1-9]\d*$/.test(id)) {
        res.status(400).json({ "mensagem": "O 'id' deve ser um número inteiro positivo e não pode ter letras!!" });
        return;
    }
};


module.exports = idEmpty;
