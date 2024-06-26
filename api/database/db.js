const mysql = require('mysql2')

const con = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
});


function connectDatabase() {
    con.connect(function (err) {
        if (err) {
            console.error('Err to conenct in dataBase:', err);
            setTimeout(connectDatabase, 5000);
        } else {
            console.log('Connect dataBase');
        }
    });
}

connectDatabase();

module.exports = con