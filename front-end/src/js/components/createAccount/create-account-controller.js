angular.module('myApp').controller('createAccountController', function($scope, $state, $http){
  $scope.createAccount = createAccount;
  $scope.message = '';
  $scope.goBack = goBack;

  function createAccount() {
    var data = {
      username: $scope.username,
      password: $scope.password,
      firstName: $scope.firstName,
      lastName: $scope.lastName,
      age: $scope.age
    };
    //Call the services
    $http.post('http://localhost:1407/create-account', JSON.stringify(data)).then(
      function (res) {
        var message = res.data.message;
        $state.go('login', {message:message, alertType:'alert-info', created:true});
    }, function(res) {
      $scope.message = res.data.message;
    });
  }

  function goBack() {
    $state.go('login');
  }
});

