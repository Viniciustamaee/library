const idEmpty = (res, req, id) => {
    if (!id) {
        res.status(404).json({ "mensagem": "Empty Id" });
        return;
    }

    if (!/^[1-9]\d*$/.test(id)) {
        res.status(400).json({ "mensagem": "The 'id' cannot be a letter or negative number!!" });
        return;
    }
};


module.exports = idEmpty;
