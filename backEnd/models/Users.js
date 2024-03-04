const con = require('../database/db')
const bcrypt = require('bcrypt');
const salts = 10;


con.connect(function () {
    let sql = "CREATE TABLE IF NOT EXISTS users (id INT PRIMARY KEY AUTO_INCREMENT,email VARCHAR(255) UNIQUE, username VARCHAR(255) UNIQUE, password VARCHAR(255), img LONGTEXT, description VARCHAR(255) ,admin ENUM('0','1') DEFAULT '0')";
    con.query(sql, function (err, result) {
        if (err) {
            console.error('Error creating table:', err);
        } else {
            console.log("Table user created");
        }
    })
});


function allUsers() {
    return new Promise((resolve, reject) => {
        con.connect((err) => {
            if (err) {
                reject(err);
            } else {
                let sql = `SELECT * FROM users`;
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



function newUser(email, username, password, img, description) {
    return new Promise((resolve, reject) => {
        con.connect((err) => {
            if (err) {
                reject(err);
            } else {
                try {
                    const passwordHash = bcrypt.hashSync(password, salts);

                    var sql = `INSERT INTO users (email, username, password, img, description ) VALUES ('${email}', '${username}', '${passwordHash}', '${img}', '${description}')`;

                    con.query(sql, (err, result) => {
                        if (err) {
                            console.log(err)
                            reject(err);
                        } else {
                            resolve(result);
                        }
                    });
                } catch (err) {
                    reject(err);
                }
            }
        });
    });
};

function existUser(username, email) {
    return new Promise((resolve, reject) => {
        con.connect((err) => {
            if (err) {
                reject(err);
            } else {
                let sql = `select * from users WHERE username='${username}' AND email='${email}'`;
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

function login(username) {
    return new Promise((resolve, reject) => {
        con.connect((err) => {
            if (err) {
                reject(err);
            } else {
                let sql = `select * from users WHERE username='${username}'`;
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

function oneUser(user_id) {
    return new Promise((resolve, reject) => {
        con.connect((err) => {
            if (err) {
                reject(err);
            } else {
                let sql = `select * from users WHERE id='${user_id}'`;
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
    existUser,
    newUser,
    login,
    oneUser,
    allUsers
}



