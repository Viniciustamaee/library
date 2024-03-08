const con = require('../database/db')

con.connect(function (err) {
    const sql = "CREATE TABLE IF NOT EXISTS rents (	rented_date DATE,  due_date DATE,id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,  user_id int ,FOREIGN KEY(user_id) REFERENCES users(id), book_id int, FOREIGN KEY(book_id) REFERENCES books(id))";
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Rents table created");
    });
});

function allrents() {
    return new Promise((resolve, reject) => {
        con.connect((err) => {
            if (err) {
                reject(err);
            } else {
                let sql = `SELECT * FROM rents`;
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

function oneBook(book_id) {
    return new Promise((resolve, reject) => {
        con.connect((err) => {
            if (err) {
                reject(err);
            } else {
                let sql = `SELECT id FROM books WHERE id='${book_id}'`;
                con.query(sql, (err, result) => {
                    if (err) {
                        reject(err);
                    } else {
                        if (result.length > 0) {
                            resolve(result);
                        } else {
                            resolve(null);
                        }
                    }
                });
            }
        });
    });
};

function newRents(rented_date, due_date, book_id, user_id) {
    return new Promise((resolve, reject) => {
        con.connect((err) => {
            if (err) {
                reject(err);
            } else {
                let sql = `UPDATE books SET quantity_available = quantity_available - 1 WHERE id = ${book_id}`;

                let sql2 = `INSERT INTO rents (rented_date, due_date,book_id,user_id) VALUES ('${rented_date}', '${due_date}', '${book_id}', '${user_id}')`;
                con.query(sql2, sql, (err, result) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(result);
                        con.query(sql, (err, result) => {
                            if (err) {
                                reject(err);
                            } else {
                                resolve(result);
                            }
                        })

                    }
                });
            }
        });
    });
}

function Delete(id) {
    return new Promise((resolve, reject) => {
        con.connect((err) => {
            if (err) {
                reject(err);
            } else {
                let book_id_query = `SELECT book_id FROM rents WHERE id=${id}`;

                con.query(book_id_query, (err, result) => {
                    if (err) {
                        console.log(err);
                        reject(err);
                    } else {
                        const book_id = result[0].book_id;

                        let sql2 = `UPDATE books SET quantity_available = quantity_available + 1 WHERE id = ${book_id}`;

                        con.query(sql2, (err, updateResult) => {
                            if (err) {
                                console.log(err);
                                reject(err);
                            } else {
                                console.log(updateResult);

                                let deleteQuery = `DELETE FROM rents WHERE id=${id};`;

                                con.query(deleteQuery, (err, deleteResult) => {
                                    if (err) {
                                        console.log(err);
                                        reject(err);
                                    } else {
                                        console.log(deleteResult);
                                        resolve(deleteResult);
                                    }
                                });
                            }
                        });
                    }
                });
            }
        });
    });
};



function update(rented_date, due_date, book_id, user_id, id) {
    return new Promise((resolve, reject) => {
        con.connect((err) => {
            if (err) {
                reject(err);
            } else {
                let sql = `UPDATE rents SET rented_date = '${rented_date}', due_date = '${due_date}', book_id = '${book_id}', user_id = '${user_id}' WHERE id = '${id}'`;
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

function quantityAvailable(book_id) {
    return new Promise((resolve, reject) => {
        con.connect((err) => {
            if (err) {
                reject(err);
            } else {
                let sql = `SELECT quantity_available FROM books WHERE id='${book_id}'`;
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

function oneRents(id) {
    return new Promise((resolve, reject) => {
        con.connect((err) => {
            if (err) {
                reject(err);
            } else {
                let sql = `SELECT * FROM rents WHERE id='${id}'`;
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


function allRentsUser(id) {
    return new Promise((resolve, reject) => {
        con.connect((err) => {
            if (err) {
                reject(err);
            } else {
                let sql = `SELECT * FROM rents WHERE user_id = '${id}'`;
                console.log(sql)
                con.query(sql, (err, result) => {
                    if (err) {
                        console.log(err)
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
    quantityAvailable,
    allRentsUser,
    allrents,
    newRents,
    oneRents,
    oneBook,
    Delete,
    update
}

