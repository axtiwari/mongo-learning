const express = require('express');
const engines = require('consolidate'); // to use template engines

const app = express();
app.engine('html', engines.nunjucks); // setting templetes
app.set('view engine', 'html');
app.set('views', `${__dirname}/view`);

app.get('/', (request, response) => {
  response.render('index', { name: 'Aurimas' }); // render( 'fileName', { key : value })
});

// nonhandled routes
app.use((request, response) => {
  response.sendStatus(404);
});

app.listen(3000, () => {
  console.log('App started on 3000');
});
