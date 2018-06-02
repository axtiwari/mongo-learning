const express = require('express');
const engines = require('consolidate');
const bodyParser = require('body-parser');
const { MongoClient } = require('mongodb');

const app = express();
app.engine('html', engines.nunjucks);
app.set('view engine', 'html');
app.set('views', `${__dirname}/view`);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

function errorHandler(error, request, response, next) {
  response.status(500);
  response.render('error', { error });
}
app.use(errorHandler);

const url = 'mongodb://localhost:27017';
MongoClient.connect(url, (connectError, db) => {
  const dbo = db.db('movies');
  app.get('/', (request, response) => {
    dbo.collection('movieDetails').find({}).toArray((findError, result) => {
      response.render('index', { movies: result });
    });
  });

  app.get('/add', (request, response) => {
    response.render('add-movie');
  });

  app.post('/', (request, response, next) => {
    const movie = request.body;
    dbo.collection('movieDetails').insertOne(movie, (insertionError) => {
      if (insertionError) {
        return insertionError;
      }
      return response.redirect('/');
    });
  });

  app.use((request, response) => {
    response.render('error', { error: 'page not found' });
  });
});

app.listen(3000);
