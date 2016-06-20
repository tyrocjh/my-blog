var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');

var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var config = require('./config');

var app = express();

mongoose.connect(config.database);
mongoose.connection.on('error', function() {
  console.info('Error: Could not connect to MongoDB. Did you forget to run `mongod`?');
});

app.set('port', process.env.PORT || 3001);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

require('./server/routes')(app);

app.get('*', function(req, res) {
  res.sendFile(__dirname + '/public/index.html');
});

app.use(function(err, req, res, next) {
  console.log(err.stack);
  res.status(err.status || 500);
  res.send({ message: err.message });
});

app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});
