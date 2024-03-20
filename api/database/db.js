const mysql = require('mysql2')

const con = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
});


function conectarBancoDeDados() {
    con.connect(function (err) {
        if (err) {
            console.error('Erro ao conectar ao banco de dados MySQL:', err);
            setTimeout(conectarBancoDeDados, 5000);
        } else {
            console.log('Conectado ao banco de dados MySQL');
        }
    });
}

conectarBancoDeDados();

module.exports = con