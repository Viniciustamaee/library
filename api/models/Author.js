const con = require('../database/db')

con.connect(function (err) {
    if (err) throw err;
    var sql = "CREATE TABLE IF NOT EXISTS authors (name VARCHAR(255) UNIQUE, id INT NOT NULL AUTO_INCREMENT PRIMARY KEY)";
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Authors table created");
    });
});

function newAuthors(name) {
    return new Promise((resolve, reject) => {
        con.connect((err) => {
            if (err) {
                return reject(err);
            }
            var sql = `INSERT INTO authors (name) VALUES ('${name}')`;
            con.query(sql, (err, result) => {
                if (err) {
                    return reject(err);
                }
                return resolve(result);
            });
        });
    });
}

function foundOneName(name) {
    return new Promise((resolve, reject) => {
        con.connect((err) => {
            if (err) {
                return reject(err);
            }
            let sql = `select * from authors where name='${name}'`;
            con.query(sql, (err, result) => {
                if (err) {
                    return reject(err);
                }
                return resolve(result);
            });
        });
    });
};

function Delete(id) {
    return new Promise((resolve, reject) => {
        const deletAuthor = `DELETE FROM authors WHERE id = '${id}'`;
        con.query(deletAuthor, (err, result) => {
            if (err) {
                console.log(err);
                return reject(err);
            }
            resolve("Operação concluída com sucesso");
        });
    });
}



function foundOneId(id) {
    return new Promise((resolve, reject) => {
        con.connect((err) => {
            if (err) {
                return reject(err);
            }
            let sql = `select * from authors where id='${id}'`;
            con.query(sql, (err, result) => {
                if (err) {
                    return reject(err);
                }
                return resolve(result);
            });
        });
    });
}

function update(name, id) {
    return new Promise((resolve, reject) => {
        con.connect((err) => {
            if (err) {
                reject(err);
            }
            let sql = `UPDATE authors SET name = '${name}' WHERE id = '${id}'`;
            con.query(sql, (err, result) => {
                if (err) {
                    return reject(err);
                }
                return resolve(result);
            });
        });
    });
};


function allAuthors() {
    return new Promise((resolve, reject) => {
        con.connect((err) => {
            if (err) {
                return reject(err);
            }
            let sql = `SELECT * FROM authors`;
            con.query(sql, (err, result) => {
                if (err) {
                    return reject(err);
                }
                return resolve(result);
            });
        });
    });
};


function oneAuthor(id) {
    return new Promise((resolve, reject) => {
        con.connect((err) => {
            if (err) {
                return reject(err);
            }
            let sql = `SELECT * FROM authors WHERE id=${id}`;
            con.query(sql, (err, result) => {
                if (err) {
                    return reject(err);
                }
                return resolve(result);
            });
        });
    });
};

module.exports = {
    foundOneName,
    foundOneId,
    newAuthors,
    Delete,
    update,
    allAuthors,
    oneAuthor
}