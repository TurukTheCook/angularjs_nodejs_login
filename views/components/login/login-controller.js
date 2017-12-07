angular.module('myApp').controller('loginController', function($scope, $state, $http){
  $scope.login = login;
  $scope.createAccount = createAccount;
  $scope.deleteToken = deleteToken;
  $scope.message = '';
  var token = localStorage.getItem('auth-token');
  $scope.message = token;

function login() {
  var data = {
    username: $scope.username,
    password: $scope.password
  };

  $http.post('http://localhost:1407/login', JSON.stringify(data)).then(function(res) {
    if (res.status == 200) {
      localStorage.setItem('auth-token', res.data.token);
      $scope.message = res.data.token;
    } else {
      $scope.message = res.data.message;
    }
  });
}

function createAccount(){
  $state.go('createAccount');
}

});

function deleteToken(){
  localStorage.setItem('auth-token', '');
}