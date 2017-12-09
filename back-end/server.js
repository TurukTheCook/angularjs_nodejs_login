// STARTERS
var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');
var userList = require('./userList.json');
var tokenList = [];
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

// CROSS ORIGIN
app.use(function (req, res, next) {
  res.header(`Access-Control-Allow-Origin`, `*`);
  res.header(`Access-Control-Allow-Methods`, `GET,PUT,POST,DELETE`);
  res.header(`Access-Control-Allow-Headers`, `Content-Type`);
  next();
});

// FUNCTIONS
function randomToken() {
  var string = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  var result = '';
  for (var i = 0; i < 32; i++) {
    result += string[Math.floor(Math.random() * (string.length - 1))];
  }
  return result;
}

function tokenCheck(token) {
  var result = tokenList.find(function (element) {
    return element == token;
  });
  return result;
}

function findUser(username) {
  var result = userList.find(function (element) {
    return element.username == username;
  });
  return result;
}

// PATHS
// LOGIN - FIRST PAGE
app.post('/login', function (req, res) {
  var body = req.body;

  if (typeof (body.username) == 'string' && typeof (body.password) == 'string') {
    var user = findUser(body.username);
    if (user) {
      var token = randomToken();
      tokenList.push(token);
      res.status(200).send({
        'token': token,
        'userId': user.username
      });
    } else {
      res.status(404).send({
        'message': 'No account found with username:' + body.username
      });
    }
  } else {
    res.status(400).send({
      'message': 'You should provide a valid username and password'
    });
  }
});

// CREATE USER ACCOUNT
app.post('/create-account', function (req, res) {
  // username: String(required),
  // firstName: String(optional),
  // lastName: String(optional),
  // password: String(required),
  // age: String, (optional)
  var body = req.body;
  var firstName = (typeof (body.firstName) == 'string') ? body.firstName : "";
  var lastName = (typeof (body.lastName) == 'string') ? body.lastName : "";
  var age = (typeof (body.age) == 'string') ? body.age : "";

  if (typeof (body.username) == 'string' && typeof (body.password) == 'string') {
    var user = findUser(username);

    if (user) {
      res.status(409).send({
        'message': 'User already exists'
      });
    } else  {
      userList.push({
        username: body.username,
        password: body.password,
        lastName: body.lastName,
        firstName: body.firstName,
        age: body.age
      });
      fs.writeFile('userList.json', JSON.stringify(userList), function (err) {
        if (err) {
          console.log('Error on writing userlist');
          res.status(500).send('message': 'Error on writing userlist');
        } else {
          console.log('New user "' + body.username + '" saved');
          res.status(200).send({
            'message': 'New user ' + body.username + ' saved'
          });
        }
      });
    }
  } else {
    res.status(412).send({
      'message': 'Please enter a valid username and password'
    });
  }
});

// GET LIST OF USERS
app.get('/users', function (req, res) {
  var sentToken = req.query.token;
  var validToken = tokenCheck(sentToken);

  if (validToken) res.status(200).send({
    'list': userList
  });
  else res.status(401).send({
    'message': 'You must be logged in to view the user list'
  });
});

// USER PROFILE DISPLAY
app.get('/user/:id', function (req, res) {
  var username = req.params.id;
  var sentToken = req.query.token;
  var validToken = tokenCheck(sentToken);


  if (validToken) {
    var user = findUser(username);
    res.status(200).send({
      'profileLastName': user.lastName,
      'profileFirstName': user.firstName,
      'profileAge': user.age
    });
  } else res.status(401).send({
    'message': 'You must be logged in to view your profile'
  });
});

// USER PROFILE UPDATE
app.put('/user/:id', function (req, res) {

});

// USER PROFILE DELETE
app.delete('/user/:id', function (req, res) {

});

// STARTING SERVER
app.listen(1407, function () {
  console.log('The server is running on port 1407...');
});