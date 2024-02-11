const bodyParser = require('body-parser');
const express = require('express')
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());


const categories = require('./router/categories')
const authors = require('./router/authors');
const books = require('./router/books')
const rents = require('./router/rents')


app.use('/Categories', categories)
app.use('/Authors', authors)
app.use('/Books', books)
app.use('/Rents', rents)

app.listen(port, () => {
    console.log('A porta está conectada')
});