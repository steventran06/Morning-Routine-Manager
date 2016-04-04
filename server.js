var express = require('express');
var partials = require('express-partials');
var session = require('express-session');
var bcrypt = require('bcrypt-nodejs');
var bodyParser = require('body-parser');

var app = express();
app.use(partials());

app.use(bodyParser.json());
// Parse forms (signup/login)
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(__dirname + '/client'));

app.set('port', (process.env.PORT || 4568));

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});