const con = require('../database/db')

con.connect(function (err) {
    const sql = "CREATE TABLE IF NOT EXISTS rents (	rented_date DATE,  due_date DATE,id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,  user_id int ,FOREIGN KEY(user_id) REFERENCES users(id), book_id int, FOREIGN KEY(book_id) REFERENCES books(id) ON DELETE CASCADE)";
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Rents table created");
    });
});

function allrents() {
    return new Promise((resolve, reject) => {
        con.connect((err) => {
            if (err) {
                return reject(err);
            }
            let sql = `SELECT * FROM rents`;
            con.query(sql, (err, result) => {
                if (err) {
                    return reject(err);
                }
                return resolve(result);

            });
        });
    });
};


function oneBook(book_id) {
    return new Promise((resolve, reject) => {
        con.connect((err) => {
            if (err) {
                return reject(err);
            }
            let sql = `SELECT id FROM books WHERE id='${book_id}'`;
            con.query(sql, (err, result) => {
                if (err) {
                    return reject(err);
                }
                if (result.length > 0) {
                    return resolve(result);
                }
                resolve(null);
            });

        });
    });
};

function newRents(rented_date, due_date, book_id, user_id) {
    return new Promise((resolve, reject) => {
        con.connect((err) => {
            if (err) {
                return reject(err);
            }
            let sql = `UPDATE books SET quantity_available = quantity_available - 1 WHERE id = ${book_id}`;

            let sql2 = `INSERT INTO rents (rented_date, due_date,book_id,user_id) VALUES ('${rented_date}', '${due_date}', '${book_id}', '${user_id}')`;
            con.query(sql2, sql, (err, result) => {
                if (err) {
                    return reject(err);
                }
                resolve(result);
                con.query(sql, (err, result) => {
                    if (err) {
                        return reject(err);
                    }
                    resolve(result);
                })
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
            let book_id_query = `SELECT book_id FROM rents WHERE id=${id}`;
            con.query(book_id_query, (err, result) => {
                if (err) {
                    console.log(err);
                    return reject(err);
                }
                const book_id = result[0].book_id;

                let sql2 = `UPDATE books SET quantity_available = quantity_available + 1 WHERE id = ${book_id}`;

                con.query(sql2, (err, updateResult) => {
                    if (err) {
                        console.log(err);
                        return reject(err);
                    }
                    let deleteQuery = `DELETE FROM rents WHERE id=${id};`;
                    con.query(deleteQuery, (err, deleteResult) => {
                        if (err) {
                            console.log(err);
                            return reject(err);
                        }
                        return resolve(deleteResult);
                    });
                });
            });
        });
    });
};



function update(rented_date, due_date, book_id, user_id, id) {
    return new Promise((resolve, reject) => {
        con.connect((err) => {
            if (err) {
                console.log(err);
                return reject(err);
            }
            const rentedDateFormatted = new Date(rented_date).toISOString().slice(0, 19).replace('T', ' ');
            const dueDateFormatted = new Date(due_date).toISOString().slice(0, 19).replace('T', ' ');

            let sql = `UPDATE rents SET rented_date = STR_TO_DATE('${rentedDateFormatted}', '%Y-%m-%d %H:%i:%s'), due_date = STR_TO_DATE('${dueDateFormatted}', '%Y-%m-%d %H:%i:%s'), book_id = '${book_id}', user_id = '${user_id}' WHERE id = '${id}'`;

            con.query(sql, (err, result) => {
                if (err) {
                    console.log(err);
                    return reject(err);
                }
                return resolve(result);
            });
        });
    });
}


function quantityAvailable(book_id) {
    return new Promise((resolve, reject) => {
        con.connect((err) => {
            if (err) {
                return reject(err);
            }
            let sql = `SELECT quantity_available FROM books WHERE id='${book_id}'`;
            con.query(sql, (err, result) => {
                if (err) {
                    return reject(err);
                }
                return resolve(result);
            });
        });
    });
};

function oneRents(id) {
    return new Promise((resolve, reject) => {
        con.connect((err) => {
            if (err) {
                return reject(err);
            }
            let sql = `SELECT * FROM rents WHERE id='${id}'`;
            con.query(sql, (err, result) => {
                if (err) {
                    return reject(err);
                }
                return resolve(result);
            });
        });
    });
};


function allRentsUser(id) {
    return new Promise((resolve, reject) => {
        con.connect((err) => {
            if (err) {
                return reject(err);
            }
            let sql = `SELECT * FROM rents WHERE user_id = '${id}'`;
            con.query(sql, (err, result) => {
                if (err) {
                    console.log(err)
                    return reject(err);
                }
                return resolve(result);
            });
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

