const con = require('../database/db')

// Falta a parte de Imgs, mas por enquanto eu não vou ter
con.connect(function () {
    let sql = "CREATE TABLE IF NOT EXISTS user (id INT PRIMARY KEY AUTO_INCREMENT,email VARCHAR(255) UNIQUE, username VARCHAR(255) UNIQUE, password VARCHAR(255))";
    con.query(sql, function (err, result) {
        if (err) {
            console.error('Error creating table:', err);
        } else {
            console.log("Table user created");
        }
    })
});