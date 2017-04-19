const express = require('express');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));

app.set('json spaces', 4);
const port = 8085;

app.use('/books', require('./books'));

//just one route here
app.post('/auth', require('./auth'));

app.use((req, res, next) => {
  if (!res.result)
    throw new Error('there is no such route and method');
  res.json({
    'ok': true,
    'data': res.result
  });
});

app.use((err, req, res, next) => {
  res.json({
    'ok': false,
    'error': err.message
  })
});

app.listen(port, () => {
  console.log(`server is running in ${port} port`);
});

module.exports = app;