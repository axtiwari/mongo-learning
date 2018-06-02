const express = require('express');
const engines = require('consolidate');

const app = express();
app.engine('html', engines.nunjucks);
app.set('view engine', 'html');
app.set('views', `${__dirname}/view`);

function errorHandler(error, request, response, next) {
  console.error(error.message);
  console.error(error.stack);
  response.status(500);
  response.render('error', { error });
}
app.use(errorHandler);

app.get('/:name/:age', (request, response) => {
  const { name, age } = request.params;
  const passedVariable = request.query.firstPassed;
  const passedCode = request.query.code;
  response.render('index', {
    name, age, passedVariable, code: passedCode,
  });
});

app.use((request, response) => {
  response.render('error', { error: 'page not found, try something like  http://localhost:3000/aurimas/10?firstPassed=pirmas&code=502' });
});

app.listen(3000);
