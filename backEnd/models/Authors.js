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

function foundOneName(name) {
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
};

function Delete(id) {
    return new Promise((resolve, reject) => {
        console.log('caralho')
        con.connect((err) => {
            if (err) {
                reject(err);
                console.log(err)
            } else {
                console.log('cu')
                const sql1 = `SELECT id FROM books WHERE author_id = '${id}'`;
                con.query(sql1, (err, result) => {
                    if (err) {
                        reject(err);
                        console.log(err)
                    } else {
                        console.log('pfv')
                        const ids = result.map(sla => sla.id);
                        let completedOperations = 0;

                        console.log(ids.length)

                        if (ids.length == 0) {
                            const apagaAuthor = `DELETE FROM authors WHERE id = '${id}'`;
                            con.query(apagaAuthor, (err) => {
                                if (err) {
                                    reject(err);
                                    console.log(err);
                                } else {
                                    resolve("Operação concluída com sucesso");
                                }
                            })
                        } else {
                            for (let i = 0; i < ids.length; i++) {

                                const apagaReview = `DELETE FROM reviews WHERE book_id = '${ids[i]}'`;
                                con.query(apagaReview, (err) => {
                                    if (err) {
                                        reject(err);
                                        console.log(err);
                                    } else {
                                        console.log(`Reviews apagadas para book_id ${ids[i]}`);
                                        const apagaRents = `DELETE FROM rents WHERE book_id = ${ids[i]}`;
                                        con.query(apagaRents, (err) => {
                                            if (err) {
                                                reject(err);
                                                console.log(err);
                                            } else {
                                                const apagaBooks = `DELETE FROM books WHERE id = ${ids[i]}`;
                                                con.query(apagaBooks, (err) => {
                                                    if (err) {
                                                        reject(err);
                                                        console.log(err);
                                                    } else {
                                                        completedOperations++;
                                                        if (completedOperations === ids.length) {
                                                            const apagaAuthor = `DELETE FROM authors WHERE id = '${id}'`;
                                                            con.query(apagaAuthor, (err) => {
                                                                if (err) {
                                                                    reject(err);
                                                                    console.log(err);
                                                                } else {
                                                                    resolve("Operação concluída com sucesso");
                                                                }
                                                            });
                                                        }
                                                    }
                                                });
                                            }
                                        });
                                    }
                                });
                            }
                        }
                    }
                });
            }
        });
    });
}



function foundOneId(id) {
    return new Promise((resolve, reject) => {
        con.connect((err) => {
            if (err) {
                reject(err);
            } else {
                let sql = `select * from authors where id='${id}'`;
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

function update(name, id) {
    return new Promise((resolve, reject) => {
        con.connect((err) => {
            if (err) {
                reject(err);
            } else {
                let sql = `UPDATE authors SET name = '${name}' WHERE id = '${id}'`;
                con.query(sql, (err, result) => {
                    if (err) {
                        reject(err);
                        console.log(err)
                    } else {
                        resolve(result);
                    }
                });
            }
        });
    });
};


function allAuthors() {
    return new Promise((resolve, reject) => {
        con.connect((err) => {
            if (err) {
                reject(err);
            } else {
                let sql = `SELECT * FROM authors`;
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
};


function oneAuthor(id) {
    return new Promise((resolve, reject) => {
        con.connect((err) => {
            if (err) {
                reject(err);
            } else {
                let sql = `SELECT * FROM authors WHERE id=${id}`;
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