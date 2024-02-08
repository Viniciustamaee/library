const con = require('../database/db')

con.connect(function (err) {
    const sql = "CREATE TABLE IF NOT EXISTS categories (category_name VARCHAR(45), id INT NOT NULL AUTO_INCREMENT PRIMARY KEY)";
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("categories created");
    });
});

function insertCategory(category_name) {
    return new Promise((resolve, reject) => {
        con.connect((err) => {
            if (err) {
                reject(err);
            } else {
                var sql = `INSERT INTO categories (category_name) VALUES ('${category_name}')`;
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


function foundOne(category_name) {
    return new Promise((resolve, reject) => {
        con.connect((err) => {
            if (err) {
                reject(err);
            } else {
                let sql = `select * from categories where category_name='${category_name}'`;
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
    insertCategory,
    foundOne
}
