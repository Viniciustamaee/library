const con = require('../database/db')

con.connect(function (err) {
    const sql = "CREATE TABLE IF NOT EXISTS categories (category_name VARCHAR(45), id INT NOT NULL AUTO_INCREMENT PRIMARY KEY)";
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Table created");
    });
});