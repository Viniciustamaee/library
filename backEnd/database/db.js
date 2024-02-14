const mysql = require('mysql2')

const con = mysql.createConnection({
    host: 'mysql',
    user: 'root',
    password: '1234',
    database: 'library'
});

con.connect(function (err) {
    if (err) {
        return console.error('Error connecting to MySQL database:', err);
    } else {
        console.log('Connected to MySQL database');
    }
});

module.exports = con