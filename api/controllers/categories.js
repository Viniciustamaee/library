const Categories = require('../models/Categorie')

module.exports.allCategories = async (req, res) => {
    try {
        const allCategoriesResult = await Categories.allCategory();
        return res.status(200).json(allCategoriesResult);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ "message": "Internal server error" });
    }
}

module.exports.new = async (req, res) => {
    const { category_name } = req.body

    if (!category_name) {
        res.status(422).json({ "message": "Camp Name is mandatory!!" });
        return;
    }

    try {
        const existingCategory = await Categories.foundOneName(category_name);

        if (existingCategory.length >= 1) {
            return res.status(422).json({ "message": "This category exisitng" });
        }
        await Categories.insertCategory(category_name);
        return res.status(200).json({ "message": "Category insert with success!" });

    } catch (error) {
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
        const existingId = await Categories.foundOneId(id);

        if (existingId.length >= 1) {
            await Categories.Delete(id)
            return res.status(200).json({ "message": "Category delete with success" });

        }
        return res.status(422).json({ "message": "Dont existing category with this id" });

    } catch (error) {
        return res.status(500).json({ "message": "Internal server error" });

    };
};

module.exports.updateCategory = async (req, res) => {
    let { category_name } = req.body;
    let { id } = req.params

    if (!/^[1-9]\d*$/.test(id)) {
        res.status(400).json({ "message": "The 'id' cannot be a letter or negative number!!" });
        return;
    }
    if (category_name == "") {
        return res.status(422).json({ "message": "Camp is mandatory!!" });
    }

    try {
        const existingId = await Categories.foundOneId(id);
        if (existingId.length >= 1) {
            await Categories.update(category_name, id)
            return res.status(200).json({ "message": "Category update with success" });
        }
        return res.status(422).json({ "message": "Dont existing category with this id " });

    } catch (erro) {
        return res.status(500).json({ "message": "Internal server error" });
    }
}