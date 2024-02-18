const con = require('../database/db');
const moment = require('moment');

function foundDueDate() {
    return new Promise((resolve, reject) => {
        con.connect(function (err) {
            if (err) {
                reject(err);
                return;
            }

            con.query("SELECT * FROM rents", function (err, result, fields) {
                if (err) {
                    reject(err);
                    return;
                }

                const todayDate = moment().format('YYYY-MM-DD');

                const booksExpired = result.filter(livro => {
                    return moment(livro.due_date).isSame(todayDate, 'day');
                });

                resolve(booksExpired);
            });
        });
    });
}

module.exports = foundDueDate;
