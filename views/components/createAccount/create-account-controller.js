angular.module('myApp').controller('createAccountController', function($scope, $state, $http){
  $scope.createAccount = createAccount;
 
  function createAccount() {
    var data = {
      username: $scope.username,
      password: $scope.password,
      firstName: $scope.firstName,
      lastName: $scope.lastName,
      age: $scope.age
    };
    //Call the services
    $http.post('http://localhost:1407/create-account', JSON.stringify(data)).then(function (res) {
      if (res.status(200)) {
        console.log(res)
      /*   localStorage.setItem('auth-token', res.data.token); */
        $state.go('login');
      }
      if (res.status(404)) {
        alert(res);
      }
    });
  }
});

