const con = require('../database/db')

con.connect(function (err) {
    if (err) throw err;
    var sql = "CREATE TABLE IF NOT EXISTS books_category (id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, book_id INT, categories_id INT,FOREIGN KEY(book_id) REFERENCES books(id),FOREIGN KEY(categories_id) REFERENCES categories(id) )";
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Books_Categories table created");
    });
});