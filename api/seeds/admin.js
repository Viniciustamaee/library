const con = require('../database/db');
const bcrypt = require('bcrypt');
const salts = 10;


con.connect((err) => {
    if (err) {
        console.error('Erro na conexão com o banco de dados:', err);
    } else {
        try {
            const password = 'Admin123';
            const img = process.env.DEFAULT_USER
            const passwordHash = bcrypt.hashSync(password, salts);

            const checkAdminQuery = `SELECT * FROM users WHERE email = 'admin@library.com'`;
            con.query(checkAdminQuery, (err, result) => {
                if (err) {
                    return console.error('Erro ao verificar usuário administrador:', err);
                } else if (result.length > 0) {
                    return console.log('Usuário administrador já existe');
                }
                const insertAdminQuery = `INSERT INTO users (email, username, password, img, description ,admin) VALUES ('admin@library.com', 'admin', '${passwordHash}', '${img}', 'Eu amo livros HAHAHAHAHAH','1')`;

                con.query(insertAdminQuery, (err, result) => {
                    if (err) {
                        return console.error('Erro ao inserir usuário administrador:', err);
                    }
                    console.log('Usuário administrador inserido com sucesso');
                });
            });
        } catch (err) {
            console.error('Erro inesperado:', err);
        }
    }
});

module.exports = con;
