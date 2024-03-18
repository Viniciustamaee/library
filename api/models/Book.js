const con = require('../database/db')

con.connect(function (err) {
    const sql = "CREATE TABLE IF NOT EXISTS books (title VARCHAR(45) UNIQUE, quantity_available INT(45), img LONGTEXT, description VARCHAR(255),author_id INT, category_id INT, id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, FOREIGN KEY(author_id) REFERENCES authors(id), FOREIGN KEY(category_id) REFERENCES categories(id))";
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Books table created");
    });
});


function allTheBooks() {
    return new Promise((resolve, reject) => {
        con.connect((err) => {
            if (err) {
                return reject(err);
            }
            let sql = `SELECT * FROM books`;
            con.query(sql, (err, result) => {
                if (err) {
                    return reject(err);
                }
                return resolve(result);
            });
        });
    });
};

function oneBook(id) {
    return new Promise((resolve, reject) => {
        con.connect((err) => {
            if (err) {
                return reject(err);
            }
            let sql = `SELECT * FROM books WHERE id='${id}'`;
            con.query(sql, (err, result) => {
                if (err) {
                    return reject(err);
                }
                return resolve(result);
            });
        });
    });
};

function foundOneName(title) {
    return new Promise((resolve, reject) => {
        con.connect((err) => {
            if (err) {
                return reject(err);
            }
            let sql = `SELECT * FROM books WHERE title='${title}'`;
            con.query(sql, (err, result) => {
                if (err) {
                    return reject(err);
                }
                return resolve(result);
            });
        });
    });
};


function newBooks(title, quantity_available, img, description, author_id, category_id) {
    return new Promise((resolve, reject) => {
        con.connect((err) => {
            if (err) {
                return reject(err);
            }
            var sql = `INSERT INTO books (title, quantity_available, img, description ,author_id, category_id) VALUES ('${title}','${quantity_available}','${img}','${description}','${author_id}','${category_id}')`;
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
            let sql = `DELETE FROM reviews WHERE book_id='${id}'`
            con.query(sql, (err, result) => {
                if (err) {
                    console.log(err)
                    return reject(err);
                }
                let sql2 = `DELETE FROM rents WHERE book_id='${id}'`
                con.query(sql2, (err, result) => {
                    if (err) {
                        console.log(err)
                        return reject(err)
                    }
                    let sql3 = `DELETE FROM books WHERE id='${id}'`;
                    con.query(sql3, (err, result) => {
                        if (err) {
                            console.log(err)
                            return reject(err)
                        }
                        return resolve(result)
                    })
                })
            });
        });
    });
};

function update(title, quantity_available, img, description, author_id, category_id, id) {
    return new Promise((resolve, reject) => {
        con.connect((err) => {
            if (err) {
                return reject(err);
            }
            let sql = `UPDATE books 
                SET title = '${title}', quantity_available = "${quantity_available}", img = '${img}', description = '${description}', author_id = '${author_id}', category_id = '${category_id}' WHERE id = '${id}'`;
            con.query(sql, (err, result) => {
                if (err) {
                    console.log(err)
                    return reject(err);
                }
                return resolve(result);
            });
        });
    });
}



module.exports = {
    foundOneName,
    allTheBooks,
    newBooks,
    oneBook,
    Delete,
    update

}