const Rents = require('../models/Rent');

module.exports.allRents = async (req, res) => {
    try {
        const allrentsResult = await Rents.allrents();
        return res.status(200).json(allrentsResult);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ "message": "Internal server error" });
    }
};

module.exports.oneRent = async (req, res) => {
    const { id } = req.params
    try {
        const oneRent = await Rents.oneRents(id);
        return res.status(200).json(oneRent);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ "message": "Internal server error" });
    }
}

module.exports.allRentsUser = async (req, res) => {
    const { id } = req.params
    try {
        const allUSers = await Rents.allRentsUser(id);
        return res.status(200).json(allUSers);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ "message": "Internal server error" });
    }
};


module.exports.newRents = async (req, res) => {
    const { rented_date, due_date, book_id, user_id } = req.body

    if (!rented_date || !due_date || !book_id || !user_id) {
        return res.status(406).json({ "erros": "Insufficient data" })
    }

    try {
        const bookData = await Rents.oneBook(book_id);

        if (bookData !== null) {
            const quantityArray = await Rents.quantityAvailable(book_id);
            const quantity = quantityArray[0].quantity_available;

            if (quantity > 0) {
                await Rents.newRents(rented_date, due_date, book_id, user_id);
                return res.status(200).json({ "message": "Rents insert with success!" });
            }
            return res.status(422).json({ "message": "Donts existing product on stock" });
        }
        return res.status(422).json({ "message": "Dont existing id of Book" });

    } catch (error) {
        console.error("Erro ao buscar livro:", error);
        return res.status(500).json({ "message": "Internal server error" });
    }
};

module.exports.update = async (req, res) => {
    const { rented_date, due_date, book_id, user_id } = req.body
    const { id } = req.params

    if (!/^[1-9]\d*$/.test(id)) {
        res.status(400).json({ "message": "The 'id' cannot be a letter or negative number!!" });
        return;
    }

    if (!rented_date || !due_date || !book_id || !user_id) {
        return res.status(406).json({ "erros": "Insufficient data" })
    }

    try {
        const bookData = await Rents.oneBook(book_id);

        if (bookData !== null) {
            const existingId = await Rents.oneRents(id);
            if (existingId.length >= 1) {
                await Rents.update(rented_date, due_date, book_id, user_id, id)
                return res.status(200).json({ "message": "Rents update with success" });
            }
            return res.status(422).json({ "message": "Donts exist the id of rents" });

        }
        return res.status(422).json({ "message": "Dont exist the id of book" });

    } catch (erro) {
        return res.status(500).json({ "message": "Internal server error" });
    }
}

module.exports.delete = async (req, res) => {
    const { id } = req.params

    if (!/^[1-9]\d*$/.test(id)) {
        res.status(400).json({ "message": "The 'id' cannot be a letter or negative number!!" });
        return;
    }

    try {
        const existingId = await Rents.oneRents(id);
        if (existingId.length > 0) {
            await Rents.Delete(id)
            return res.status(200).json({ "message": "Rents delte with success" });
        }
        return res.status(422).json({ "message": "Dont existing id of Rents" });

    } catch (error) {
        res.status(500).json({ "message": "Internal server error" });
    }
};
