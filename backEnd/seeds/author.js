const con = require('../database/db')


con.connect((err) => {
    if (err) {
        console.error('Erro na conexão com o banco de dados:', err);
    } else {
        const insertAuthor = `INSERT INTO author (name) VALUES 'J. K. Rowling'`
        con.query(insertAuthor, function (err, result) {
            if (err) {
                console.log('Adicionado Author')
            } else {
                console.log('Author já adicionado')
            }
        });
    }
})

module.exports = con
