var express = require('express');
var partials = require('express-partials');
var session = require('express-session');
var bcrypt = require('bcrypt-nodejs');
var bodyParser = require('body-parser');

var db = require('./app/config');
var Users = require('./app/collections/users');
var User = require('./app/models/user');
var Routines = require('./app/collections/routines');
var Routine = require('./app/models/routine');


var app = express();
app.use(partials());

app.use(bodyParser.json());
// Parse forms (signup/login)
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(__dirname + '/client'));


// LOGIN STUFF!
app.post('/login', function(req, res) {
  var username = req.body.username;
  var inputPw = req.body.password;

  db.knex('users').select('password').where({username: username}).then(function (queryResults) {
    if (queryResults.length === 0) {
      console.log('Username does not exist');
      res.redirect('/signup');
    } else {
      var password = queryResults[0].password;
      bcrypt.compare(inputPw, password, function (err, result) {
        if (err) {
          console.log(err);
        } else {
          if (result) {
            req.session.regenerate(function() {
              // give session.user a username
              req.session.user = username;
              console.log('session user:', req.session.user);
              // redirect to the homepage
              res.redirect('/');
            });
          } else {
            console.log('Wrong password');
            res.render('/signup');
          }
        }
      });
    }
  });
});

app.post('/signup', function(req, res) {
  var username = req.body.username;
  var inputPw = req.body.password;

  bcrypt.genSalt(5, function(err, salt) {
    if (err) {
      console.log(err);
    } else {
      bcrypt.hash(inputPw, salt, null, function(err, password) {
        if (err) {
          console.log(err);
        } else {
          db.knex('users').select('*').where({username: username}).then(function (queryResults) {
            if (queryResults.length === 0) {
              db.knex.insert({username: username, password: password}).into('users').then(function(results) {
                console.log('ADDED TO DATABASE');
                console.log(username);
                console.log(password);
                res.render('/');
              });
            } else {
              res.render('error');
            }
          });
        }
      });
    }
  });
});


app.set('port', (process.env.PORT || 4568));

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});