const mysql = require('mysql2')

const con = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
});

con.connect(function (err) {
    while (err) {
        if (err) {
            return console.error('Error connecting to MySQL database:', err);
        } else {
            console.log('Connected to MySQL database');
        }
    }

});

module.exports = con