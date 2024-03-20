const con = require('../database/db')

con.connect((err) => {
    if (err) {
        return console.error('Erro na conexão com o banco de dados:', err);
    }
    const insertAuthor = `INSERT INTO authors (name) VALUES ('J. K. Rowling')`
    con.query(insertAuthor, function (err, result) {
        if (err) {
            return console.log('Author já adicionado')
        }
        return console.log('Author adicionado')
    });
})

module.exports = con
