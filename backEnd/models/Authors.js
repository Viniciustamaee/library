const con = require('../database/db')


con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
    var sql = "CREATE TABLE IF NOT EXISTS authors (name VARCHAR(255), id INT NOT NULL AUTO_INCREMENT PRIMARY KEY)";
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Table created");
    });
});


function insertAuthors(name) {
    return new Promise((resolve, reject) => {
        con.connect((err) => {
            if (err) {
                reject(err);
            } else {
                var sql = `INSERT INTO authors (name) VALUES ('${name}')`;
                con.query(sql, (err, result) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(result);
                    }
                });
            }
        });
    });
}



function foundOne(name) {
    return new Promise((resolve, reject) => {
        con.connect((err) => {
            if (err) {
                reject(err);
            } else {
                let sql = `select * from authors where name='${name}'`;
                con.query(sql, (err, result) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(result);
                    }
                });
            }
        });
    });
}

module.exports = {
    insertAuthors,
    foundOne
}