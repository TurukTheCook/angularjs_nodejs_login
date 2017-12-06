angular.module('myApp').controller('createUserController', function($scope, $state, $http){
  // $scope.createUser = _createProfile;
  $scope.createUser = createUser;
 
  function createUser() {
    var data = {
      username: $scope.username,
      password: $scope.password,
      age: $scope.age
    };
    //Call the services
    $http.post('http://localhost:5000/create-account', JSON.stringify(data)).then(function (res) {
      if (res.status(200)) {
        console.log(res);
        $state.go('/login');
      }
      if (res.status(404)) {
        alert(res.data.message);
      }
    });
    console.log('ok');
  }
});
//
// var http = require('http');
//
// http.createServer(function (req, res) {
//   res.write('Hello World!'); //write a response to the client
//   res.end(); //end the response
// }).listen(5000); //the server object listens on port 8080
