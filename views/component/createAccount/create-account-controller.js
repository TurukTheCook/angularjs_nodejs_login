angular.module('myApp').controller('createAccountController', function($scope, $state, $http){
  $scope.createAccount = createAccount;
 
  function createAccount() {
    var data = {
      username: $scope.username,
      password: $scope.password,
      age: $scope.age
    };
    //Call the services
    $http.post('http://localhost:5000/create-account', JSON.stringify(data)).then(function (res) {
      if (res.status(200)) {
        $state.go('/login');
      }
      if (res.status(404)) {
        alert(res.data.message);
      }
    });
  }
});

