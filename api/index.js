const bodyParser = require('body-parser');
const express = require('express')
const cors = require('cors');
require('dotenv').config();
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

const categories = require('./router/categories')
const authors = require('./router/authors');
const user = require('./router/user')
const books = require('./router/books')
const review = require('./router/reviews')
const rents = require('./router/rents')

require('./seeds/categories')
require('./seeds/admin')
require('./seeds/author')


app.use(cors({
    origin: process.env.VITE_PORT,
    credentials: true
}));


app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.json({ error: err });
});

app.use('/categories', categories)
app.use('/authors', authors)
app.use('/books', books)
app.use('/review', review)
app.use('/rents', rents)
app.use('/user', user)

app.listen(process.env.NODE_PORT, () => {
    console.log('Connect')
});
