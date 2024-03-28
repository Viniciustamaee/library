const con = require('../database/db');
const bcrypt = require('bcrypt');
const salts = 10;

con.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
    } else {
        try {
            const password = 'Admin123';
            const img = process.env.DEFAULT_USER
            const passwordHash = bcrypt.hashSync(password, salts);

            const checkAdminQuery = `SELECT * FROM users WHERE email = 'admin@library.com'`;
            con.query(checkAdminQuery, (err, result) => {
                if (err) {
                    return console.error('Error verifying admin user:', err);
                } else if (result.length > 0) {
                    return console.log('Administrator user already exists');
                }
                const insertAdminQuery = `INSERT INTO users (email, username, password, img, description ,admin) VALUES ('admin@library.com', 'admin', '${passwordHash}', '${img}', 'Eu amo livros HAHAHAHAHAH','1')`;

                con.query(insertAdminQuery, (err, result) => {
                    if (err) {
                        return console.error('Error when entering admin user:', err);
                    }
                    console.log('Admin user successfully entered');
                });
            });
        } catch (err) {
            console.error('Erro inesperado:', err);
        }
    }
});

module.exports = con;
