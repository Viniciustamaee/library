const mysql = require('mysql2')

const con = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
});


(con.connect(function (err) {
    if (err) {
        return console.error('Erro ao conectar ao banco de dados MySQL:', err);
    } else {
        console.log('Conectado ao banco de dados MySQL');
    }
}), 5000);

module.exports = con