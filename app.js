var express = require('express');
var app = express();

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
  res.json(require('./data.js'));
});

app.listen(8080, function () {
  console.log('listening on port 8080');
});
