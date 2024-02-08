const bodyParser = require('body-parser');
const express = require('express')
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

const authors = require('./router/authors');
const books = require('./router/books')
const categories = require('./router/categories')

app.use('/Authors', authors)
app.use('/Books', books)
app.use('/Categories', categories)

app.listen(port, () => {
    console.log('A porta está conectada')
});