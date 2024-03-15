const session = require('express-session');
const bodyParser = require('body-parser');
const passport = require('passport');
const express = require('express')
const cors = require('cors');
require('dotenv').config();
const app = express();
const port = process.env.NODE_PORT;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

const categories = require('./router/categories')
const authors = require('./router/authors');
const user = require('./router/user')
const books = require('./router/books')
const review = require('./router/reviews')
const rents = require('./router/rents')

const category = require('./seeds/categories')
const admin = require('./seeds/admin')

app.use(cors({
    origin: `http://localhost:${process.env.VITE_PORT}`,
    credentials: true
}));


app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.json({ error: err });
});

app.use('/Categories', categories)
app.use('/Authors', authors)
app.use('/Books', books)
app.use('/Review', review)
app.use('/Rents', rents)
app.use('/User', user)

app.listen(port, () => {
    console.log('A porta está conectada')
});
