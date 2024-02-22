const con = require('../database/db')

con.connect(function (err) {
    // Criar descrição
    const sql = "CREATE TABLE IF NOT EXISTS books (title VARCHAR(45) UNIQUE, quantity_available INT(45), img VARCHAR(200), author_id INT, category_id INT, id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, FOREIGN KEY(author_id) REFERENCES authors(id), FOREIGN KEY(category_id) REFERENCES categories(id))";
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Books table created");
    });
});

function allTheBooks() {
    return new Promise((resolve, reject) => {
        con.connect((err) => {
            if (err) {
                reject(err);
            } else {
                let sql = `SELECT * FROM books`;
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

function oneBook(id) {
    return new Promise((resolve, reject) => {
        con.connect((err) => {
            if (err) {
                reject(err);
            } else {
                let sql = `SELECT * FROM books WHERE id='${id}'`;
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

function foundOneName(title) {
    return new Promise((resolve, reject) => {
        con.connect((err) => {
            if (err) {
                reject(err);
            } else {
                let sql = `SELECT * FROM books WHERE title='${title}'`;
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

function newBooks(title, quantity_available, img, author_id, category_id) {
    return new Promise((resolve, reject) => {
        con.connect((err) => {
            if (err) {
                reject(err);
            } else {
                var sql = `INSERT INTO books (title, quantity_available, img, author_id, category_id) VALUES ('${title}','${quantity_available}','${img}','${author_id}','${category_id}')`;
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

function Delete(id) {
    return new Promise((resolve, reject) => {
        con.connect((err) => {
            if (err) {
                reject(err);
            } else {
                let sql = `DELETE FROM books WHERE id='${id}'`;
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

function update(title, quantity_available, img, author_id, category_id, id) {
    return new Promise((resolve, reject) => {
        con.connect((err) => {
            if (err) {
                reject(err);
            } else {
                let sql = `UPDATE books SET title = '${title}',quantity_available = "${quantity_available}", img='${img}', author_id = '${author_id}',  category_id = '${category_id}' WHERE id = '${id}'`;
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
    foundOneName,
    allTheBooks,
    newBooks,
    oneBook,
    Delete,
    update

}