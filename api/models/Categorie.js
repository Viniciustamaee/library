const con = require('../database/db')

con.connect(function (err) {
    const sql = "CREATE TABLE IF NOT EXISTS categories (category_name VARCHAR(45) UNIQUE, id INT NOT NULL AUTO_INCREMENT PRIMARY KEY)";
    con.query(sql, function (err, result) {
        if (err) throw err; { }
        console.log("Categories table created");
    });
});


function allCategory() {
    return new Promise((resolve, reject) => {
        con.connect((err) => {
            if (err) {
                return reject(err);
            }
            let sql = `SELECT * FROM categories`;
            con.query(sql, (err, result) => {
                if (err) {
                    return reject(err);
                }
                return resolve(result);
            });
        });
    });
};

function insertCategory(category_name) {
    return new Promise((resolve, reject) => {
        con.connect((err) => {
            if (err) {
                return reject(err);
            }
            var sql = `INSERT INTO categories (category_name) VALUES ('${category_name}')`;
            con.query(sql, (err, result) => {
                if (err) {
                    return reject(err);
                }
                return resolve(result);

            });
        });
    });
}

function foundOneName(category_name) {
    return new Promise((resolve, reject) => {
        con.connect((err) => {
            if (err) {
                return reject(err);
            }
            let sql = `select * from categories where category_name='${category_name}'`;
            con.query(sql, (err, result) => {
                if (err) {
                    return reject(err);
                }
                return resolve(result);
            });
        });
    });
};

function foundOneId(id) {
    return new Promise((resolve, reject) => {
        con.connect((err) => {
            if (err) {
                return reject(err);
            }
            let sql = `select * from categories where id='${id}'`;
            con.query(sql, (err, result) => {
                if (err) {
                    return reject(err);
                }
                return resolve(result);
            });
        });
    });
}

function Delete(id) {
    return new Promise((resolve, reject) => {
        con.connect((err) => {
            if (err) {
                return reject(err);
            }
            let sql = `DELETE FROM categories WHERE id='${id}'`;
            con.query(sql, (err, result) => {
                if (err) {
                    return reject(err);
                }
                return resolve(result);
            });
        });
    });
};

function update(name, id) {
    return new Promise((resolve, reject) => {
        con.connect((err) => {
            if (err) {
                return reject(err);
            }
            let sql = `UPDATE categories SET category_name = '${name}' WHERE id = '${id}'`;
            con.query(sql, (err, result) => {
                if (err) {
                    return reject(err);
                }
                return resolve(result);
            });
        });
    });
}

module.exports = {
    insertCategory,
    foundOneName,
    allCategory,
    foundOneId,
    Delete,
    update
}
