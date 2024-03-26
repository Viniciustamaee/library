const Books = require('../models/Book')

module.exports.allBooks = async (req, res) => {
    try {
        const allBooksResult = await Books.allTheBooks();
        return res.status(200).json(allBooksResult);
    } catch (error) {
        return res.status(500).json({ "message": "Internal server error" });
    }
}

module.exports.newBooks = async (req, res) => {
    const { title, quantity_available, author_id, category_id, description } = req.body;
    let img;

    if (req.file && req.file.path) {
        img = req.file.path;
    } else {
        img = process.env.DEFAULT_BOOK;
    }

    if (!title || !quantity_available || !author_id || !category_id || !description) {
        return res.status(422).json({ "message": "Camp is mandatory!!" });
    }

    if (!/^[0-9]+$/.test(author_id) || !/^[0-9]+$/.test(author_id) || !/^[0-9]+$/.test(category_id) || !/^[0-9]+$/.test(quantity_available)) {
        return res.status(422).json({ "message": "Quantity and ID need to be just a number" });
    }

    try {
        const existingTitle = await Books.foundOneName(title);
        if (existingTitle.length >= 1) {
            return res.status(409).json({ "message": "Books existing!" });
        }

        await Books.newBooks(title, quantity_available, img, description, author_id, category_id);
        return res.status(200).json({ "message": "Book insert with success!" });

    } catch (error) {
        return res.status(500).json({ "message": "Internal server error" });
    }
};


module.exports.oneBooks = async (req, res) => {
    const { id } = req.params

    if (!/^[1-9]\d*$/.test(id)) {
        res.status(400).json({ "message": "The 'id' cannot be a letter or negative number!!" });
        return;
    }
    try {
        const oneBook = await Books.oneBook(id);
        return res.status(200).json(oneBook);

    } catch (error) {
        return res.status(500).json({ "message": "Internal server error" });
    }
};

module.exports.delete = async (req, res) => {
    const { id } = req.params

    if (!/^[1-9]\d*$/.test(id)) {
        res.status(400).json({ "message": "The 'id' cannot be a letter or negative number!!" });
        return;
    }
    try {
        const existingId = await Books.oneBook(id);
        if (existingId.length >= 1) {
            await Books.Delete(id)
            return res.status(200).json({ "message": "Books delete with success" });
        }

        return res.status(422).json({ "message": "Dont existing book with this id" });


    } catch (error) {
        return res.status(500).json({ "message": "Internal server error" });
    }
}

module.exports.updateBooks = async (req, res) => {
    let { title, quantity_available, description, author_id, category_id } = req.body;
    let { id } = req.params
    let img;



    if (!title || !quantity_available || !author_id || !category_id || !description) {
        return res.status(422).json({ "message": "Camp Name is mandatory!!" });
    }

    if (!/^[0-9]+$/.test(author_id) || !/^[0-9]+$/.test(category_id) || !/^[0-9]+$/.test(quantity_available)) {
        return res.status(422).json({ "message": "Quantity and ID need to be just a number" });
    }

    if (!/^[1-9]\d*$/.test(id)) {
        res.status(400).json({ "message": "The 'id' cannot be a letter or negative number!!" });
        return;
    }

    try {
        const existingId = await Books.oneBook(id);
        if (existingId.length >= 1) {

            const imgBook = await Books.oneBook(id);

            if (req.file && req.file.path) {
                img = req.file.path;
            } else {
                img = imgBook[0].img;
            }

            await Books.update(title, quantity_available, img, description, author_id, category_id, id)
            return res.status(200).json({ "message": "Author update with success" });
        }



        return res.status(422).json({ "message": "Dont existing the author wirh this ID" });

    } catch (erro) {
        return res.status(500).json({ "message": "Internal server error" });
    }
}
