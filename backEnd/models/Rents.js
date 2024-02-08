const con = require('../database/db')


con.connect(function (err) {
    const sql = "CREATE TABLE IF NOT EXISTS rents (	rented_date DATE,  due_date DATE,id INT NOT NULL, id_book AUTO_INCREMENT PRIMARY KEY)";
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Table created");
    });
});

