var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');
var tokenList = require('./tokenList.json');
var userList = require('./userList.json');
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.post('/login', function(req, res){
  var username = req.body.username;
  var password = req.body.password;
  var user = findUserValid(username, password);

  if (typeof(username) == 'string' && typeof(password) == 'string' && user){
    var token = randomToken();
    tokenList.list.push(token);
    fs.writeFile('./tokenList.json', JSON.stringify(tokenList), function(err){
      if(err) throw(err);
      console.log('New token saved');
    });
    res.status(200).send({token: token}); 
  } else {
    res.status(404).send({message: 'You should provide a valid username and password'});
  }
});

app.post('/create-account', function(req, res){
  // username: String(required),
  // firstName: String(optional),
  // lastName: String(optional),
  // password: String(required),
  // age: String, (optional)
  if (typeof(req.body.firstName) == 'string'){
    var firstName = req.body.firstName;}
    else {
      var firstName = "";
    }
  if (typeof (req.body.lastName) == 'string') {
    var lastName = req.body.lastName;
  }
  else {
    var lastName = "";
  }
  if (typeof (req.body.age) == 'string') {
    var age = req.body.age;
  }
  else {
    var age = "";
  }

  var username = req.body.username;
  var password = req.body.password;

  if (typeof(username) == 'string' && typeof(password) == 'string'){
     var userExist = findUserExist(username);
     console.log('username: ', username);
     console.log('userExist: ', userExist);
     if (username == userExist) {
       res.status(404).send({message: 'User already exists'});
     } else {
       userList.list.push({username:username, password:password, lastName:lastName, firstName:firstName, age:age});
       fs.writeFile('./userList.json', JSON.stringify(userList), function (err) {
         if (err) throw (err);
         console.log('New user saved');
       });
       res.status(200).send({message: 'New user saved'}); 
     }
  }
});

app.get('/users', function(req, res){

});

app.listen(5000, function(){
  console.log('The server is running on port 5000...');
});

function randomToken(){
  var string = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  var result = '';
  for(var i = 0; i < 8; i++){
    result += string[Math.floor(Math.random()*(string.length-1))];
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
  if(result){
    return result.username;
  }
}