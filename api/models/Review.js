const con = require('../database/db')

con.connect(function () {
    let sql = "CREATE TABLE IF NOT EXISTS reviews (id INT PRIMARY KEY AUTO_INCREMENT,comment VARCHAR(255),rating INT(5),user_id INT,book_id INT,FOREIGN KEY(book_id) REFERENCES books(id),FOREIGN KEY(user_id) REFERENCES users(id)); ";
    con.query(sql, function (err, result) {
        if (err) {
            console.error('Error creating table:', err);
        } else {
            console.log("Reviews created table");
        }
    })
});

function allReviewBook(id) {
    return new Promise((resolve, reject) => {
        con.connect((err) => {
            if (err) {
                reject(err);
            } else {
                let sql = `SELECT * FROM reviews WHERE book_id = '${id}'`;
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

function newReview(comment, rating, user_id, book_id) {
    return new Promise((resolve, reject) => {
        con.connect((err) => {
            if (err) {
                reject(err);
            } else {
                var sql = `INSERT INTO reviews (comment, rating, user_id, book_id) VALUES ('${comment}','${rating}','${user_id}','${book_id}')`;
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


function Delete(idReview) {
    return new Promise((resolve, reject) => {
        con.connect((err) => {
            if (err) {
                reject(err);
            } else {
                let sql = `DELETE FROM reviews WHERE id='${idReview}'`;
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
    allReviewBook,
    newReview,
    Delete
}