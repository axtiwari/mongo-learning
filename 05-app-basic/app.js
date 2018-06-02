const express = require('express');
const engines = require('consolidate');
const { MongoClient } = require('mongodb');

const app = express();
app.engine('html', engines.nunjucks);
app.set('view engine', 'html');
app.set('views', `${__dirname}/view`);

const url = 'mongodb+srv://m001-student:m001-mongodb-basics@sandbox-m9gut.mongodb.net/test?retryWrites=true';
MongoClient.connect(url, (connectError, db) => {
  const dbo = db.db('video');

  app.get('/', (request, response) => {
    dbo.collection('movieDetails').find({}).toArray((findError, result) => {
      response.render('index', { movies: result });
    });
  });

  app.use((resuest, response) => {
    response.sendStatus(404);
  });
});

app.listen(3000);
