const express = require('express');

const app = express();

app.get('/', (request, response) => {
  response.send('Hello world!');
});

// nonhandled routes
app.use((request, response) => {
  response.sendStatus(404);
});

app.listen(3000, () => {
  console.log('App started on 3000');
});
