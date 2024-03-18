const con = require('../database/db')

const category = ['Romance', 'Ficção científica', 'Fantasia', 'Terror', 'Mistério', 'Suspense', 'Drama', 'Comédia', 'Livro infantil']

con.connect(function (err) {
    if (err) throw err;
    for (let id = 1; id <= category.length - 1; id++) {
        var sql = `INSERT INTO categories (category_name) VALUES ('${category[id]}')`;
        con.query(sql, function (err, result) {

        });
    }
    if (err) {
        console.log('Já foi add')
    } else {
        console.log('categories add!!')
    }
});

module.exports = con