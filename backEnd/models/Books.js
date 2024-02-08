const con = require('../database/db')

// Falta a parte de Imgs, mas por enquanto eu não vou ter
con.connect(function (err) {
    const sql = "CREATE TABLE IF NOT EXISTS books (
    title VARCHAR(45),
        quantity_available INT(45),
            author_id INT,
                category_id INT,
                    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
                        FOREIGN KEY(author_id) REFERENCES authors(id),
                            FOREIGN KEY(category_id) REFERENCES categories(id))";
con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table created");
});
});

