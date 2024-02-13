const con = require('../database/db')


con.connect(function (err) {
    const sql = "CREATE TABLE IF NOT EXISTS rents (	rented_date DATE,  due_date DATE,id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, id_book int, FOREIGN KEY(id_book) REFERENCES books(id))";
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


function oneBook(id_book) {
    return new Promise((resolve, reject) => {
        con.connect((err) => {
            if (err) {
                reject(err);
            } else {
                let sql = `SELECT id FROM books WHERE id='${id_book}'`;
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

// New
function newRents(rented_date, due_date, id_book) {
    return new Promise((resolve, reject) => {
        con.connect((err) => {
            if (err) {
                reject(err);
            } else {
                let sql = `UPDATE books SET quantity_available = quantity_available - 1 WHERE id = ${id_book}`;

                let sql2 = `INSERT INTO rents (rented_date, due_date,id_book) VALUES ('${rented_date}', '${due_date}', ${id_book})`;
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


// Delete
function Delete(id) {
    return new Promise((resolve, reject) => {
        con.connect((err) => {
            if (err) {
                reject(err);
            } else {
                let sql = `DELETE FROM rents WHERE id='${id}'`;
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

// update
function update(rented_date, due_date, id_book, id) {
    return new Promise((resolve, reject) => {
        con.connect((err) => {
            if (err) {
                reject(err);
            } else {
                let sql = `UPDATE rents SET rented_date = '${rented_date}', due_date = '${due_date}', id_book = '${id_book}' WHERE id = '${id}'`;
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


function quantityAvailable(id_book) {
    return new Promise((resolve, reject) => {
        con.connect((err) => {
            if (err) {
                reject(err);
            } else {
                let sql = `SELECT quantity_available FROM books WHERE id='${id_book}'`;
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




module.exports = {
    allrents,
    newRents,
    Delete,
    update,
    oneBook,
    quantityAvailable,
    oneRents
}

