var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');
var tokenList = require('./tokenList.json');
var userList = require('./userList.json');
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(function (req, res, next) {
  res.header(`Access-Control-Allow-Origin`, `*`);
  res.header(`Access-Control-Allow-Methods`, `GET,PUT,POST,DELETE`);
  res.header(`Access-Control-Allow-Headers`, `Content-Type`);
  next();
});

function randomToken() {
  var string = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  var result = '';
  for (var i = 0; i < 8; i++) {
    result += string[Math.floor(Math.random() * (string.length - 1))];
  }
  return result;
}

function findUserValid(username, password) {
  var result = userList.list.find(function (element) {
    if (element.username == username && element.password == password) {
      return element;
    }
  });
  return result;
}

function findUserExist(username) {
  var result = userList.list.find(function (element) {
    if (element.username == username) {
      return element;
    }
  });
  if (result) {
    return result.username;
  }
}

app.post('/login', function(req, res){
  console.log(req.body.username);
  console.log(req.body.password);
  var username = req.body.username;
  var password = req.body.password;
  var user = findUserValid(username, password);

  if (typeof(username) == 'string' && typeof(password) == 'string' && user){
    var token = randomToken();
    tokenList.list.push(token);
    fs.writeFile('tokenList.json', JSON.stringify(tokenList), function(err){
      if(err) throw(err);
      console.log('New token saved');
    });
    res.status(200).send(token); 
  } else {
    res.status(400).send('You should provide a valid username and password');
  }
});

app.post('/create-account', function(req, res){
  // username: String(required),
  // firstName: String(optional),
  // lastName: String(optional),
  // password: String(required),
  // age: String, (optional)
  var firstName = (typeof(req.body.firstName) == 'string') ? req.body.firstName : "";
  var lastName = (typeof(req.body.lastName) == 'string') ? req.body.lastName : "";
  var age = (typeof(req.body.age) == 'string') ? req.body.age : "";

  var username = req.body.username;
  var password = req.body.password;

  if (typeof(username) == 'string' && typeof(password) == 'string'){
     var userExist = findUserExist(username);
     if (username == userExist) {
       res.status(400).send('User already exists');
     } else {
       userList.list.push({username:username, password:password, lastName:lastName, firstName:firstName, age:age});
       fs.writeFile('userList.json', JSON.stringify(userList), function (err) {
         if (err) throw (err);
         console.log('New user saved');
       });
       res.status(200).send('New user saved'); 
     }
  } else {
    res.status(400).send('Please enter a valid username and password');
  }
});

app.get('/users', function(req, res){
  res.status(200).send('users');
});


app.listen(1407, function(){
  console.log('The server is running on port 1407...');
});