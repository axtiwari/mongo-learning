const express = require('express');
const engines = require('consolidate');
const bodyParser = require('body-parser');

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

app.get('/', (request, response, next) => {
  response.render('index', { hobies: ['sport', 'programing', 'movies', 'other'] });
});

app.post('/hobby', (request, response, next) => {
  const favorite = request.body.hobby;
  if (!favorite) {
    return next(Error('Please select your favorite hoby'));
  }
  return response.send(`you selected ${favorite} nice choice`);
});

app.use((request, response) => {
  response.render('error', { error: 'page not found' });
});

app.listen(3000);
