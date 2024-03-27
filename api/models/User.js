const con = require('../database/db')
const bcrypt = require('bcrypt');
const salts = 10;


con.connect(function () {
    let sql = "CREATE TABLE IF NOT EXISTS users (id INT PRIMARY KEY AUTO_INCREMENT,email VARCHAR(255), username VARCHAR(255) UNIQUE, password VARCHAR(255), img LONGTEXT, description VARCHAR(255) ,admin ENUM('0','1') DEFAULT '0')";
    con.query(sql, function (err, result) {
        if (err) {
            return console.error('Error creating table:', err);
        }
        return console.log("Table user created");
    })
});


function allUsers() {
    return new Promise((resolve, reject) => {
        con.connect((err) => {
            if (err) {
                return reject(err);
            }
            let sql = `SELECT * FROM users`;
            con.query(sql, (err, result) => {
                if (err) {
                    return reject(err);
                }
                return resolve(result);
            });
        });
    });
};



function newUser(email, username, password, img, description) {
    return new Promise((resolve, reject) => {
        con.connect((err) => {
            if (err) {
                console.log(err)
                return reject(err);
            }
            try {
                const passwordHash = bcrypt.hashSync(password, salts);

                let sql = `INSERT INTO users (email, username, password, img, description ) VALUES ('${email}', '${username}', '${passwordHash}', '${img}', '${description}')`;

                con.query(sql, (err, result) => {
                    if (err) {
                        console.log(err)
                        return reject(err);
                    }
                    resolve(result);

                });
            } catch (err) {
                reject(err);
            }
        });
    });
};

function existUser(username, email) {
    return new Promise((resolve, reject) => {
        con.connect((err) => {
            if (err) {
                return reject(err);
            }
            let sql = `select * from users WHERE username='${username}' AND email='${email}'`;
            con.query(sql, (err, result) => {
                if (err) {
                    return reject(err);
                }
                return resolve(result);
            });
        });
    });
};


function img(email) {
    return new Promise((resolve, reject) => {
        con.connect((err) => {
            if (err) {
                return reject(err);
            }
            let sql = `select * from users WHERE email='${email}'`;
            con.query(sql, (err, result) => {
                if (err) {
                    return reject(err);
                }
                return resolve(result);
            });
        });
    });
};

function login(username) {
    return new Promise((resolve, reject) => {
        con.connect((err) => {
            if (err) {
                return reject(err);
            }
            let sql = `select * from users WHERE username='${username}'`;
            con.query(sql, (err, result) => {
                if (err) {
                    return reject(err);
                }
                return resolve(result);
            });
        });
    });
};

function oneUser(user_id) {
    return new Promise((resolve, reject) => {
        con.connect((err) => {
            if (err) {
                return eject(err);
            }
            let sql = `select * from users WHERE id='${user_id}'`;
            con.query(sql, (err, result) => {
                if (err) {
                    return reject(err);
                }
                return resolve(result);
            });
        });
    });
};


function update(email, username, password, img, description, id) {
    return new Promise((resolve, reject) => {
        con.connect((err) => {
            if (err) {
                console.log(err)

                return reject(err);
            }
            const passwordHash = bcrypt.hashSync(password, salts);
            let sql = `UPDATE users SET email = '${email}', username  = '${username}', password = '${passwordHash}', img='${img}', description='${description}' WHERE id = '${id}'`;
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
    existUser,
    newUser,
    login,
    oneUser,
    allUsers,
    update,
    img
}



