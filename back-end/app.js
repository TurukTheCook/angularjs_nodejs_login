var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.post('/login', function(req, res){

});

app.post('/create-account', function(req, res){

});

app.get('/users', function(req, res){

});

app.listen(5000, function(){
  console.log('The server is running on port 5000...');
});